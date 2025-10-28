using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestApp.Models
{
    public class StoreGames
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("description")]
        public string Description { get; set; } = null!;

        [BsonElement("imageUrl")]
        public string ImageUrl { get; set; } = null!;
        [BsonElement("price")]
        public string Price { get; set; }

        [BsonElement("genre")]
        public string Genre { get; set; } = null!;
        
        [BsonElement("store")]
        public string Store { get; set; }

    }
}