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
        try
        {
            _featuredGamesServices = featuredGamesServices;
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"Failed to initialize FeaturedGamesController: {ex.Message}");
            throw new ArgumentNullException();
        }
        
    }   
    
    // GET: api/featured-games
    [HttpGet]
    public async Task<ActionResult<List<FeaturedGames>>> Get()
    {
        try
        {
            var featuredGames = await _featuredGamesServices.GetAsyncFeaturedGames();

            if (featuredGames == null || featuredGames.Count == 0)
            {
                return NotFound();
            }
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(featuredGames));
            return featuredGames;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching featured games: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    // POST: api/featured-games
    [HttpPost]
    public async Task<IActionResult> Post(FeaturedGames newFeaturedGame)
    {
        await _featuredGamesServices.CreateAsync(newFeaturedGame);
        return CreatedAtAction(nameof(Get), new { id = newFeaturedGame.Id }, newFeaturedGame);
    }
}