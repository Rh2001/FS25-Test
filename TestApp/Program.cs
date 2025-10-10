using TestApp.Models;
using MongoDB.Driver;
using TestApp.Services;


var builder = WebApplication.CreateBuilder(args);

// Adding CORS support to our backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Configure MongoDB settings
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBConnection")); // Bind the "MongoDBConnection" section
builder.Services.AddSingleton<StoreServices>();      //Add MongoDB StoreServices to communicate with MongoDB
 

/*// Add services to the container.
builder.Services.AddControllersWithViews();*/
builder.Services.AddControllers();

var app = builder.Build();
app.UseCors("AllowReactApp");
app.MapControllers();
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
