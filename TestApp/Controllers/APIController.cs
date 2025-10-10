using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class APIController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        Console.WriteLine("APIController Get method called");
        return Ok(new { Message = "Hello from APIController" });
    }
}