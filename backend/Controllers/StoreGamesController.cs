using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/store-games")]

public class StoreGamesController : ControllerBase
{
    private readonly StoreGamesServices _storeGamesServices;

    // Initialize the StoreGamesServices with a constructor
    public StoreGamesController(StoreGamesServices storeGamesServices)
    {
        try
        {
            _storeGamesServices = storeGamesServices;
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"Failed to initialize StoreGamesController: {ex.Message}");
            throw new ArgumentNullException();
        }
    }
    
    // GET Request to api/store-games
    [HttpGet]
    public async Task<ActionResult<List<StoreGames>>> Get()
    {
        try
        {
            var storeGames = await _storeGamesServices.GetAsyncStoreGames();

            if (storeGames == null || storeGames.Count == 0)
            {
                return NotFound();
            }
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(storeGames));
            return storeGames;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching store games: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    // Get a store game by its ID 

    [HttpGet("{id}")]
    public async Task<ActionResult<StoreGames>> GetById(string id)
    {
        try
        {
            var game = await _storeGamesServices.GetByIdAsync(id);
            if (game == null)
                return NotFound();

            return game;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching store game by id: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] StoreGames newGame)
    {
        // Very simple permissionclaim check
        var permissionClaim = User.FindFirst("permissionLevel");
        if (permissionClaim == null || permissionClaim.Value != "1")
            return Forbid();

        if (newGame == null)
            return BadRequest("Game cannot be null.");

        await _storeGamesServices.CreateAsync(newGame);
        return CreatedAtAction(nameof(GetById), new { id = newGame.Id }, newGame);
    }

    // Delete game from: api/store-games/{id} (This is for admins only)
    [Authorize]
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var permissionClaim = User.FindFirst("permissionLevel");
        if (permissionClaim == null || permissionClaim.Value != "1")
            return Forbid();

        var existing = await _storeGamesServices.GetByIdAsync(id);
        if (existing == null)
            return NotFound();

        await _storeGamesServices.DeleteAsync(id);
        return NoContent();
    }

    
}