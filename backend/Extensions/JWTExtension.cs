//JWT Configuration extension

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TestApp.Extensions
{
    public static class JWTExtension
    {
        public static IServiceCollection AddMyJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var JWTSettingsSection = configuration.GetSection("JWTSettings");
            var JWTKey = JWTSettingsSection.GetValue<string>("SecretKey");
            var JWTIssuer = JWTSettingsSection.GetValue<string>("Issuer");
            var JWTAudience = JWTSettingsSection.GetValue<string>("Audience");

            var KeyBytes = Encoding.UTF8.GetBytes(JWTKey); // Convert the secret key to bytes

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = JWTIssuer,
                    ValidAudience = JWTAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(KeyBytes)
                };
            });

            return services;
        }
    }
}