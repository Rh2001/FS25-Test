using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class APIController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { Message = "Hello from APIController" });
    }
}