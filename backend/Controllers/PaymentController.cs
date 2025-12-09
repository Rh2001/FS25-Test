using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe.Checkout;
using TestApp.Models;
using TestApp.Services;

namespace TestApp.Controllers
{
    public class CreateCheckoutSessionRequest
    {
        public string GameId { get; set; } = "";
    }

    [ApiController]
    [Route("api/payments")]
    public class PaymentController : ControllerBase
    {
        private readonly StoreGamesServices _storeGamesServices;
        private readonly IConfiguration _configuration;

        public PaymentController(StoreGamesServices storeGamesServices, IConfiguration configuration)
        {
            _storeGamesServices = storeGamesServices;
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.GameId))
                return BadRequest("GameId is required.");

            var games = await _storeGamesServices.GetAsyncStoreGames();
            var game = games.FirstOrDefault(g => g.Id == request.GameId);
            if (game == null)
                return NotFound("Game not found.");

            var clientUrl = _configuration["ClientAppUrl"] ?? "https://localhost:3000";

            var priceNumber = 0m;
            if (!string.IsNullOrWhiteSpace(game.Price) &&
                decimal.TryParse(game.Price, NumberStyles.Number, CultureInfo.InvariantCulture, out var parsed))
            {
                priceNumber = parsed;
            }

            if (priceNumber <= 0)
                return BadRequest("Invalid price.");

            var options = new SessionCreateOptions
            {
                Mode = "payment",
                SuccessUrl = $"{clientUrl}/payment/success?session_id={{CHECKOUT_SESSION_ID}}&gameId={game.Id}",
                CancelUrl = $"{clientUrl}/store/{game.Id}",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Quantity = 1,
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            UnitAmount = (long)(priceNumber * 100),
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = game.Title
                            }
                        }
                    }
                }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return Ok(new { checkoutUrl = session.Url });
        }
    }
}
