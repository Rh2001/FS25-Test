using System.Security.Claims;
using BCrypt.Net;
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

        public record RegisterRequest(
            string Name,
            string Email,
            string Password,
            string Phone,
            string Address,
            DateTime? Dob
        );

        public record LoginRequest(string Email, string Password);

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var userList = await _userServices.GetAsyncUsers();
            return Ok(userList);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> GetCustomerByIdUsingPath(string id)
        {
            var user = await _userServices.GetAsync(id);
            if (user is null)
            {
                return NotFound("Customer not found");
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<object>> Register([FromBody] RegisterRequest request)
        {
            if (request == null)
                return BadRequest("User cannot be empty.");

            if (string.IsNullOrWhiteSpace(request.Email))
                return BadRequest(new { message = "Email is required." });

            if (string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "Password is required." });

            if (await _userServices.EmailExistsAsync(request.Email))
                return Conflict(new { message = "An account with this email already exists." });

            try
            {
                var user = new User
                {
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone,
                    Address = request.Address,
                    Dob = request.Dob,
                    PermissionLevel = 0,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
                };

                await _userServices.CreateAsync(user);

                var token = await _userServices.AuthenticateAsync(request.Email, request.Password);
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
            catch
            {
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

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<object>> GetMe()
        {
            var userId = await ResolveUserIdAsync();
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _userServices.GetByIdAsync(userId);
            if (user == null) return NotFound();

            return Ok(new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                permissionLevel = user.PermissionLevel,
                purchasedGameIds = user.PurchasedGameIds ?? new List<string>()
            });
        }

        [Authorize]
        [HttpPost("purchases")]
        public async Task<ActionResult> AddPurchase([FromBody] AddPurchaseRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.GameId))
                return BadRequest(new { message = "GameId is required." });

            var userId = await ResolveUserIdAsync();
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized(new { message = "Invalid or missing user id." });

            var success = await _userServices.AddPurchaseAsync(userId, request.GameId);
            if (!success)
                return StatusCode(500, new { message = "Failed to add purchase." });

            return Ok(new { message = "Purchase added successfully." });
        }

        public record AddPurchaseRequest(string GameId);

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

            var gameIds = user.PurchasedGameIds ?? new List<string>();
            if (!gameIds.Any())
                return Ok(Array.Empty<StoreGames>());

            var games = await _storeGamesServices.GetByIdsAsync(gameIds);
            return Ok(games);
        }

        private async Task<string?> ResolveUserIdAsync()
        {
            var idClaim = User.FindFirst("id");
            if (idClaim != null && !string.IsNullOrWhiteSpace(idClaim.Value))
            {
                return idClaim.Value;
            }

            var emailClaim = User.FindFirst(ClaimTypes.Email) ?? User.FindFirst("email");
            if (emailClaim == null || string.IsNullOrWhiteSpace(emailClaim.Value))
                return null;

            var user = await _userServices.GetByEmailAsync(emailClaim.Value);
            return user?.Id;
        }
    }
}