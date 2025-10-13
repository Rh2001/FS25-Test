using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/featured-games")]
public class FeaturedGamesController : ControllerBase
{
    private readonly FeaturedGamesServices _featuredGamesServices;

    // Initialize the FeaturedGamesServices with a constructor
    public FeaturedGamesController(FeaturedGamesServices featuredGamesServices)
    {
        _featuredGamesServices = featuredGamesServices;
    }   
    
    // GET: api/featured-games
    [HttpGet]
    public async Task<List<FeaturedGames>> Get()
    {
        var featuredGames = await _featuredGamesServices.GetAsyncFeaturedGames();
        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(featuredGames));
        return featuredGames;
    }

    // POST: api/featured-games
    [HttpPost]
    public async Task<IActionResult> Post(FeaturedGames newFeaturedGame)
    {
        await _featuredGamesServices.CreateAsync(newFeaturedGame);
        return CreatedAtAction(nameof(Get), new { id = newFeaturedGame.Id }, newFeaturedGame);
    }
}