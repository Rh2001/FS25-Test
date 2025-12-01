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

        // Get a store game by its ID
        public async Task<StoreGames?> GetByIdAsync(string id) =>
            await _storeGamesCollection.Find(g => g.Id == id).FirstOrDefaultAsync();


        // Get multiple games by Ids
        public async Task<List<StoreGames>> GetByIdsAsync(IEnumerable<string> ids)
        {
            if (ids == null)
            {
                return new List<StoreGames>();
            }

            var listId = ids.Where(id => !string.IsNullOrWhiteSpace(id)).Distinct().ToList();
            
            if (listId.Count == 0)
            {
                return new List<StoreGames>();
            }

            var filter = Builders<StoreGames>.Filter.In(g => g.Id, listId); // Filter the list of IDs.
            return await _storeGamesCollection.Find(filter).ToListAsync();

        }
    }

}
