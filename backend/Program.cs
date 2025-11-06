using TestApp.Models;
using MongoDB.Driver;
using TestApp.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens; // For use with tokens.


var builder = WebApplication.CreateBuilder(args);

//JWT Settings
var JWTSettingsSection = builder.Configuration.GetSection("JWTSettings");
var JWTKey = JWTSettingsSection.GetValue<string>("SecretKey");
var JWTTokenExpirationTime = JWTSettingsSection.GetValue<int>("ExpirationTime");
var JWTIssuer = JWTSettingsSection.GetValue<string>("Issuer");
var JWTAudience = JWTSettingsSection.GetValue<string>("Audience");

// Adding CORS support to our backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Configure MongoDB settings
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBConnection")); // Bind the "MongoDBConnection" section
builder.Services.AddSingleton<FeaturedGamesServices>(); //Add MongoDB FeaturedGamesServices to communicate with MongoDB
builder.Services.AddSingleton<StoreGamesServices>();    //Add MongoDB StoreGamesServices to communicate with MongoDB
builder.Services.AddScoped<UserServices>();      //Add MongoDB StoreServices to communicate with MongoDB, we use scoped here because it differs per request.


var KeyBytes = Encoding.UTF8.GetBytes(JWTKey); // Convert the secret key to bytes


/*// Add services to the container.
builder.Services.AddControllersWithViews();*/
builder.Services.AddControllers();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = true;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = JWTIssuer,
                        ValidAudience = JWTAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(KeyBytes),
                        ClockSkew = TimeSpan.Zero // Eliminate delay when token expires

                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine("Authentication failed: " + context.Exception.Message);
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            Console.WriteLine("Token validated for: " + context.Principal.Identity.Name);
                            return Task.CompletedTask;
                        },
                        OnMessageReceived = context =>
                        {
                            var AccessToken = context.Request.Cookies["access-token"];
                            if (!string.IsNullOrEmpty(AccessToken))
                            {
                                context.Token = AccessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };

                });


builder.Services.AddAuthorization();
var app = builder.Build();
app.UseCors("AllowReactApp");
app.UseHttpsRedirection(); // Enforce HTTPS in the backend.
app.MapControllers();
//app.UseAuthentication();
//app.UseAuthorization();
app.Run();

/*

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();*/
