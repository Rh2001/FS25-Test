using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestApp.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Nullable to allow MongoDB to auto generate

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("password")]
        public string PasswordHash { get; set; } = null!;

        [BsonElement("email")]
        public string Email { get; set; } = null!;

        [BsonElement("phone")]
        public string Phone { get; set; } = null!;

        [BsonElement("address")]
        public string Address { get; set; } = null!;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("dob")]
        public DateTime? Dob { get; set; }

        [BsonElement("permissionLevel")]
        public int PermissionLevel { get; set; } = 0;   

        [BsonElement("purchasedGameIds")]
        public List<string> PurchasedGameIds { get; set; } = new List<string>(); 

    }
}