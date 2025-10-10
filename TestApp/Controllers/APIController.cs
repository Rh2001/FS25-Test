// To do: Fix the Async method

using System.Diagnostics;
using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class APIController : ControllerBase
{
    private readonly CustomerServices _customerServices;
    public APIController(CustomerServices customerServices)
    {
        _customerServices = customerServices;
    }

    [HttpGet("customers")]
    public async Task<ActionResult<List<Customer>>> GetCustomers()
    {
        var customers = await _customerServices.GetAsyncCustomers();
        return Ok(customers);
    }
}