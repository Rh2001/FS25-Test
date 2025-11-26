using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options; //  To be able to fetch from appsettings.json.
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;
using TestApp.Models;
namespace TestApp.Services
{

    public class UserServices
    {
        private readonly IMongoCollection<Models.User> _userCollection;
        private readonly IConfiguration _configuration;
        public UserServices(IOptions<MongoDBSettings> mongoDBSettings, IConfiguration configuration)
        {
            var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(mongoDBSettings.Value.CollectionName.User);
            _configuration = configuration;
        }

        // New, check if email exists to catch multiple registrations with the same email.

        public async Task<bool> EmailExistsAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            var count = await _userCollection.CountDocumentsAsync(filter);
            return count > 0;
        }

        // Create a new customer
        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);

        public async Task<User?> GetByEmailAsync(string email) =>
            await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
            public string GenerateJwtForUser(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
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

        // Get all customers
        public async Task<List<User>> GetAsyncUsers() =>
            await _userCollection.Find(_ => true).ToListAsync();


        // Get a specific customer by ID
        public async Task<User?> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();



        // Update a customer by ID

        public async Task UpdateAsync(string id, User updatedCustomer) =>
            await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedCustomer);




        public async Task<string?> AuthenticateAsync(string email, string password)
        {
            // Find the user by email
            var user = await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();

            if (user == null) return null; // User not found, must implement something else here later.
            if (user.Password != password) return null; // Simple plain-text check.

            // JWT Settings
            var jwtSection = _configuration.GetSection("JWTSettings");
            var key = jwtSection.GetValue<string>("SecretKey");
            var issuer = jwtSection.GetValue<string>("Issuer");
            var audience = jwtSection.GetValue<string>("Audience");
            var expiryMinutes = jwtSection.GetValue<int>("ExpiryInMinutes");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // JWT Claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", user.Id)
            };

            claims.Add(new Claim("permissionLevel", user.PermissionLevel.ToString()));


            // Create token
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    }