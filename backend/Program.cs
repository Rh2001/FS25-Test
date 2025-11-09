// Todo: Note to self: Please modularize this Roham, this is messy and i'm going to go insane reading all of this.
using TestApp.Models;
using MongoDB.Driver;
using TestApp.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens; // For use with tokens.
using Microsoft.OpenApi.Models; // For Swagger
using System.Reflection.Metadata; 


var builder = WebApplication.CreateBuilder(args);

//JWT Settings
var JWTSettingsSection = builder.Configuration.GetSection("JWTSettings");
var JWTKey = JWTSettingsSection.GetValue<string>("SecretKey");
var JWTTokenExpirationTime = JWTSettingsSection.GetValue<int>("ExpirationTime");
var JWTIssuer = JWTSettingsSection.GetValue<string>("Issuer");
var JWTAudience = JWTSettingsSection.GetValue<string>("Audience");
var SwaggerURL = "https://localhost:443/swagger";

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



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>  // Swagger is a lifesaver when it comes to testing API endpoints.
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BokharApp", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"

    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>   // This part might be a little confusing, we are configuring the JWT bearer options here, you can modify the JWTIssuer and other settings in appsettings.json
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
app.UseSwagger();
app.UseSwaggerUI(); // I added this line to enable Swagger UI, it will help us with testing the API endpoints.
app.UseHttpsRedirection(); // Enforce HTTPS in the backend.
app.MapControllers();


try // Quality of life change to make my life easier, this opens swagger when i run the server automatically so i dont type it in everytime.
{
    // Wait a bit to ensure Kestrel starts before opening the browser
    _= Task.Run(async () => // Fire and forget because thats how we do it.
    {
        await Task.Delay(2000);
        try
        {
            var psi = new System.Diagnostics.ProcessStartInfo
            {
                FileName = SwaggerURL,
                UseShellExecute = true // Open default browser.
            };
            System.Diagnostics.Process.Start(psi);
        }
        catch (Exception ex)
        {
         Console.WriteLine($"Failed to open Swagger automatically: {ex.Message}");
        }
    });
}
catch (Exception ex)
{
    Console.WriteLine($"Error scheduling Swagger launch: {ex.Message}");
}



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
