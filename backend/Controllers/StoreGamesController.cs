using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;

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
    
    // GET: api/store-games
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
}