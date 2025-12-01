/* uses authorizatoin when accessing user data*/

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestApp.Models;
using TestApp.Services;

namespace TestApp.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;
        private readonly StoreGamesServices _storeGamesServices;

        public UserController(UserServices userServices, StoreGamesServices storeGamesServices)
        {
            _userServices = userServices ?? throw new ArgumentNullException(nameof(userServices));
            _storeGamesServices = storeGamesServices ?? throw new ArgumentNullException(nameof(storeGamesServices));
        }

        [HttpGet("protected")]
        [Authorize]
        public async Task<ActionResult<List<User>>> Get()
        {
            try
            {
                var users = await _userServices.GetAsyncUsers();
                if (users == null || users.Count == 0)
                    return NotFound();

                return users;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching users: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<object>> Register([FromBody] User user)
        {
            if (user == null)
                return BadRequest("User cannot be empty.");

            if (string.IsNullOrWhiteSpace(user.Email))
                return BadRequest(new { message = "Email is required." });

            // Accept only one account per email.
            if (await _userServices.EmailExistsAsync(user.Email))
                return Conflict(new { message = "An account with this email already exists." });

            try
            {
                await _userServices.CreateAsync(user);

                var token = await _userServices.AuthenticateAsync(user.Email, user.Password);
                if (token == null)
                    return StatusCode(500, "Token generation failed.");

                return Ok(new
                {
                    message = "User registered successfully",
                    user = new
                    {
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        permissionLevel = user.PermissionLevel,
                        purchasedGameIds = user.PurchasedGameIds ?? new List<string>()
                    },
                    token
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> Login([FromBody] LoginRequest loginRequest)
        {
            var token = await _userServices.AuthenticateAsync(loginRequest.Email, loginRequest.Password);
            if (token == null)
                return Unauthorized(new { message = "Invalid credentials" });

            var user = await _userServices.GetByEmailAsync(loginRequest.Email);
            if (user == null)
                return Unauthorized(new { message = "User not found" });

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    permissionLevel = user.PermissionLevel,
                    purchasedGameIds = user.PurchasedGameIds ?? new List<string>()
                }
            });
        }

        // Add a purchased gameId for the current user
        [Authorize]
        [HttpPost("purchases")]
        public async Task<ActionResult> AddPurchase([FromBody] AddPurchaseRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.GameId)) // Missing gameId.
                return BadRequest(new { message = "GameId is required." });

            var userId = await ResolveUserIdAsync(); // Call resolve method
            if (string.IsNullOrWhiteSpace(userId)) // Missing userId.
                return Unauthorized(new { message = "Invalid or missing user id." });

            // Verify that the game exists
            var game = await _storeGamesServices.GetByIdAsync(request.GameId);
            if (game == null)
                return NotFound(new { message = "Game not found." });

            var result = await _userServices.AddPurchaseAsync(userId, request.GameId);
            if (!result)
                return BadRequest(new { message = "Could not add purchase." });

            return Ok(new { message = "Purchase added to database." });
        }

        // Get StoreGames objects for the current user's purchases
        [Authorize]
        [HttpGet("purchases")]
        public async Task<ActionResult<IEnumerable<StoreGames>>> GetPurchases()
        {
            var userId = await ResolveUserIdAsync();
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized(new { message = "Invalid or missing user id." });

            var user = await _userServices.GetByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var games = await _storeGamesServices.GetByIdsAsync(user.PurchasedGameIds ?? new List<string>());
            return Ok(games);
        }



        private async Task<string?> ResolveUserIdAsync()
        {
            // Try direct id claim
            var id = User.FindFirstValue("id")
                     ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? User.FindFirstValue(ClaimTypes.Sid);

            if (!string.IsNullOrWhiteSpace(id))
                return id;

            // Resolve from email(should not be called under normal circumstances)
            var email = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue("email");
            if (string.IsNullOrWhiteSpace(email))
                return null;

            var user = await _userServices.GetByEmailAsync(email);
            return user?.Id;
        }

        public record LoginRequest(string Email, string Password);

        public class AddPurchaseRequest
        {
            public string GameId { get; set; } = string.Empty;
        }
    }
}