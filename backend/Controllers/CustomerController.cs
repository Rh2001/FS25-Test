using System.Diagnostics;
using TestApp.Services;
using TestApp.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/customer")]
public class CustomerController : ControllerBase
{
    private readonly CustomerServices _customerServices;

    // Initialize the CustomerServices with a constructor
    public CustomerController(CustomerServices customerServices)
    {
        _customerServices = customerServices;
    }   
    

    [HttpGet]
    public async Task<List<Customer>> Get()
    {
        var Customers = await _customerServices.GetAsyncCustomers();
        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(Customers));
        return Customers;
    }

    [HttpGet]
    public async Task<List<Customer>> Get(string Id)
    {
        var customers = await _customerServices.GetAsyncCustomers(Id);
        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(customers));
        return customers;
    }

}