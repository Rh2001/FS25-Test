namespace TestApp.Models
{
    public class MongoDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string MessagesCollection { get; set; } = null!;
    }
}