using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestApp.Models
{
    public class FeaturedGames
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("description")]
        public string Description { get; set; } = null!;

        [BsonElement("imageUrl")]
        public string ImageUrl { get; set; } = null!;

        [BsonElement("price")]
        public decimal Price { get; set; }

        
    }
}