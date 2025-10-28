using Microsoft.Extensions.Options; // To be able to fetch options from appsettings.json
using MongoDB.Driver;
using TestApp.Models;

namespace TestApp.Models
{
    public class StoreGamesServices
    {
        private readonly IMongoCollection<Models.StoreGames> _storeGamesCollection;
        public StoreGamesServices(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _storeGamesCollection = mongoDb.GetCollection<StoreGames>(mongoDBSettings.Value.CollectionName.StoreGames);
        }

        // Get all store games
        public async Task<List<StoreGames>> GetAsyncStoreGames() =>
            await _storeGamesCollection.Find(_ => true).ToListAsync();
    }

}
