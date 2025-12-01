using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using TestApp.Models;

namespace TestApp.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IConfiguration _configuration;

        public UserServices(IOptions<MongoDBSettings> mongoDBSettings, IConfiguration configuration)
        {
            var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(mongoDBSettings.Value.CollectionName.User);
            _configuration = configuration;
        }

        // Check if email exists to catch multiple registrations with the same email.
        public async Task<bool> EmailExistsAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            var count = await _userCollection.CountDocumentsAsync(filter);
            return count > 0;
        }

        // Create a new user
        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);

        public async Task<User?> GetByIdAsync(string id) =>
            await _userCollection.Find(u => u.Id == id).FirstOrDefaultAsync();

        public async Task<User?> GetByEmailAsync(string email) =>
            await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();

        // Legacy JWT generator (if you still use this anywhere)
        public string GenerateJwtForUser(User user)
        {
            var keyString = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim("name", user.Name ?? string.Empty)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Get all users
        public async Task<List<User>> GetAsyncUsers() =>
            await _userCollection.Find(_ => true).ToListAsync();

        // Get a specific user by ID (legacy name)
        public async Task<User?> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Update a user by ID
        public async Task UpdateAsync(string id, User updatedCustomer) =>
            await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedCustomer);

        // Authenticate and generate JWT based on JWTSettings
        public async Task<string?> AuthenticateAsync(string email, string password)
        {
            var user = await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null) return null;
            if (user.Password != password) return null; // replace with proper hashing later

            var jwtSection = _configuration.GetSection("JWTSettings");
            var keyString = jwtSection.GetValue<string>("SecretKey") ?? throw new InvalidOperationException("JWTSettings:SecretKey is not configured");
            var issuer = jwtSection.GetValue<string>("Issuer") ?? string.Empty;
            var audience = jwtSection.GetValue<string>("Audience") ?? string.Empty;
            var expiryMinutes = jwtSection.GetValue<int>("ExpiryInMinutes");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", user.Id ?? string.Empty),
                new Claim("permissionLevel", user.PermissionLevel.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Store a purchased gameId on the user
        public async Task<bool> AddPurchaseAsync(string userId, string gameId)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(gameId))
                return false;

            var update = Builders<User>.Update.AddToSet(u => u.PurchasedGameIds, gameId);
            var result = await _userCollection.UpdateOneAsync(u => u.Id == userId, update);
            return result.ModifiedCount > 0 || result.MatchedCount > 0;
        }
    }
}