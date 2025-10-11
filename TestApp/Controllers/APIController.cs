using System.Diagnostics;
using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/customer")]
public class APIController : ControllerBase
{
    private readonly CustomerServices _customerServices;

    // Initialize the CustomerServices with a constructor
    public APIController(CustomerServices customerServices)
    {
        _customerServices = customerServices;
    }   
    

    [HttpGet]
    public async Task<List<Customer>> Get()
    {
        return await _customerServices.GetAsyncCustomers();
    }

    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

}