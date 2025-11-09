// Cors configuration extension method for IServiceCollection, we're using a static class here to have access to it in our program.cs file.

namespace TestApp.Extensions
{
    public static class CorsExtension
    {
        public static IServiceCollection AddMyCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
            return services;
        }
    }
}