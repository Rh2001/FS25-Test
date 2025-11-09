using TestApp.Extensions;

var builder = WebApplication.CreateBuilder(args);

// I modularized the service configurations using extension methods -> much cleaner program.cs file.
CorsExtension.AddMyCors(builder.Services);
builder.Services.AddMyMongoDB(builder.Configuration);
builder.Services.AddMyJWT(builder.Configuration);
builder.Services.AddMySwagger();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();

var app = builder.Build();


app.UseCors("AllowReactApp");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.MapControllers();

// Clean way to auto-launch Swagger UI in default browser when the app starts.
SwaggerAutoLauncher.Open("https://localhost:443/swagger");

app.Run();
