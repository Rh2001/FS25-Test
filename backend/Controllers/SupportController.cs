using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

namespace TestApp.Controllers
{
    [ApiController]
    [Route("api/support")]
    public class SupportController : ControllerBase
    {
      private readonly IConfiguration _configuration;

      public SupportController(IConfiguration configuration)
      {
        _configuration = configuration;
      }

      public record SupportRequest(string Email, string Message);

      [HttpPost]
      public async Task<IActionResult> Send([FromBody] SupportRequest request)
      {
        if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Message))
          return BadRequest(new { message = "Email and message are required." });

        var toEmail = _configuration["Support:ToEmail"];
        var fromEmail = _configuration["Support:FromEmail"] ?? toEmail;
        var smtpHost = _configuration["Support:SmtpHost"];
        var smtpPort = _configuration.GetValue<int?>("Support:SmtpPort") ?? 587;
        var smtpUser = _configuration["Support:SmtpUser"];
        var smtpPass = _configuration["Support:SmtpPass"];

        if (string.IsNullOrWhiteSpace(toEmail) || string.IsNullOrWhiteSpace(smtpHost) || string.IsNullOrWhiteSpace(fromEmail))
          return StatusCode(500, new { message = "Support email is not configured." });

        using var client = new SmtpClient(smtpHost, smtpPort)
        {
          EnableSsl = true
        };

        if (!string.IsNullOrWhiteSpace(smtpUser))
          client.Credentials = new NetworkCredential(smtpUser, smtpPass);

        var mail = new MailMessage
        {
          From = new MailAddress(fromEmail),
          Subject = "New support request",
          Body = $"From: {request.Email}{Environment.NewLine}{Environment.NewLine}{request.Message}",
          IsBodyHtml = false
        };
        mail.To.Add(toEmail);

        await client.SendMailAsync(mail);

        return Ok(new { message = "Support request sent." });
      }
    }
}