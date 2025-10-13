using MongoDB.Driver;

namespace TestApp.Models
{
    public class MongoDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public MongoCollections CollectionName { get; set; } = null!;
    }

    public class MongoCollections
    {
        public string Customer { get; set; } = null!;
        public string FeaturedGames { get; set; } = null!;
    } 
}