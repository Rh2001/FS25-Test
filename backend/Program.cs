using TestApp.Extensions;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// I modularized the service configurations using extension methods -> much cleaner program.cs file. The naming convention is because I didn't want my extensions to collide with .NET built-in methods.
CorsExtension.AddMyCors(builder.Services);
builder.Services.AddMyMongoDB(builder.Configuration);
builder.Services.AddMyJWT(builder.Configuration);
builder.Services.AddMySwagger();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();

var stripeSecretKey = builder.Configuration["Stripe:SecretKey"];
StripeConfiguration.ApiKey = stripeSecretKey;

var app = builder.Build();


app.UseCors("AllowReactApp");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.MapControllers();

// Clean way to auto-launch Swagger UI in default browser when the app starts.
SwaggerAutoLauncher.Open("https://localhost:443/swagger");

app.Run();
