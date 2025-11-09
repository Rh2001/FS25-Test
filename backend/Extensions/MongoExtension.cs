//MongoDB service registrations moved to extension method for cleaner Program.cs

using TestApp.Models;
using TestApp.Services;

namespace TestApp.Extensions
{
    public static class MongoExtension
    {
        public static IServiceCollection AddMyMongoDB(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDBSettings>(configuration.GetSection("MongoDBConnection"));

            services.AddSingleton<FeaturedGamesServices>();
            services.AddSingleton<StoreGamesServices>();
            services.AddScoped<UserServices>();

            return services;
        }
    }
}
