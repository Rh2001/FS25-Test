using Microsoft.Extensions.Options; // To be able to fetch options from appsettings.json
using MongoDB.Driver;
using TestApp.Models;

namespace TestApp.Services
{

    public class UserServices
    {
        private readonly IMongoCollection<Models.User> _userCollection;
        public UserServices(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(mongoDBSettings.Value.CollectionName.User);
        }

        // Create a new customer
        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);

        // Get all customers
        public async Task<List<User>> GetAsyncUsers() =>
            await _userCollection.Find(_ => true).ToListAsync();


        // Get a specific customer by ID
        public async Task<User?> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();



        // Update a customer by ID

        public async Task UpdateAsync(string id, User updatedCustomer) =>
            await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedCustomer);





    }
}