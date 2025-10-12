namespace TestApp.Services;

using Microsoft.Extensions.Options; // To be able to fetch options from appsettings.json
using MongoDB.Driver;
using TestApp.Models;

public class CustomerServices
{
    private readonly IMongoCollection<Models.Customer> _customersCollection;
    public CustomerServices(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var mongoDb = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _customersCollection = mongoDb.GetCollection<Customer>(mongoDBSettings.Value.CollectionName);
    }

    // Get all customers
    public async Task<List<Customer>> GetAsyncCustomers() =>
        await _customersCollection.Find(_ => true).ToListAsync();
        

    // Get a specific customer by ID
    public async Task<Customer?> GetAsync(string id) =>
        await _customersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

   

}