using System.Diagnostics;
using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly UserServices _userServices;

    // Initialize the CustomerServices with a constructor
    public UserController(UserServices userServices)
    {
        try // Template try and catch, not effective whatsoever, but added for consistency, will replace later on.
        {
            _userServices = userServices;
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"Failed to initialize CustomerController: {ex.Message}");
            throw new ArgumentNullException();
        }

    }


    [HttpGet("protected")]
    [Authorize]
    public async Task<ActionResult<List<User>>> Get()  // Changed to actionresult to allow error handling
    {
        try
        {
            var users = await _userServices.GetAsyncUsers();
            if (users == null || users.Count == 0)
            {
                return NotFound();
            }
            else
            {
                Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(users));
            }
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(users));
            return users;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching customers: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<ActionResult<User>> InsertUser([FromBody] User user)
    {
        if (user == null) return BadRequest("User cannot be empty.");
        try
        {
            await _userServices.CreateAsync(user);
            return CreatedAtAction(nameof(Get), null, user);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequest loginRequest)
    {
        var token = await _userServices.AuthenticateAsync(loginRequest.Email, loginRequest.Password);
        if (token == null)
            return Unauthorized(new { message = "Invalid credentials" });

        return Ok(new { token });
    }
    public record LoginRequest(string Email, string Password);





}