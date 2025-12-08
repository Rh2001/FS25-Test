using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace TestApp.Controllers
{

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
            featuredGames ??= new List<FeaturedGames>();
            return Ok(featuredGames);

        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching featured games: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    // Post Request to api/featured-games for admins only
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] FeaturedGames newFeaturedGame)
    {
        var permissionClaim = User.FindFirst("permissionLevel");
        if (permissionClaim == null || permissionClaim.Value != "1")
            return Forbid();

        if (newFeaturedGame == null)
            return BadRequest("Game cannot be null.");

        await _featuredGamesServices.CreateAsync(newFeaturedGame);
        return CreatedAtAction(nameof(Get), new { id = newFeaturedGame.Id }, newFeaturedGame);
    }

    // DELETE request to api/featured-games/{id} for admins only, uses authorize to ensure only authorized users can delete
    [Authorize]
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var permissionClaim = User.FindFirst("permissionLevel");
        if (permissionClaim == null || permissionClaim.Value != "1")
            return Forbid();

        
        var all = await _featuredGamesServices.GetAsyncFeaturedGames();
        var existing = all.FirstOrDefault(g => g.Id == id);
        if (existing == null)
            return NotFound();

        //await _featuredGamesServices.DeleteAsync(id);
        return NoContent();
    }
}
}