using Microsoft.Extensions.Options; // To be able to fetch options from appsettings.json
using MongoDB.Driver;
using TestApp.Models;
namespace TestApp.Services
{

    public class FeaturedGamesServices
    {
        private readonly IMongoCollection<Models.FeaturedGames> _featuredGamesCollection;
        public FeaturedGamesServices(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _featuredGamesCollection = mongoDb.GetCollection<FeaturedGames>(mongoDBSettings.Value.CollectionName.FeaturedGames);
        }

        // Create a new featured game
        public async Task CreateAsync(Models.FeaturedGames newFeaturedGame) =>
            await _featuredGamesCollection.InsertOneAsync(newFeaturedGame);

        // Get all featured games
        public async Task<List<FeaturedGames>> GetAsyncFeaturedGames() =>
            await _featuredGamesCollection.Find(_ => true).ToListAsync();
    }
}