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
        try // Template try and catch, not effective whatsoever, but added for consistency, will replace later on.
        {
            _customerServices = customerServices;
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"Failed to initialize CustomerController: {ex.Message}");
            throw new ArgumentNullException();
        }
        
    }


    [HttpGet]
    public async Task<ActionResult<List<Customer>>> Get()  // Changed to actionresult to allow error handling
    {
        try
        {
            var Customers = await _customerServices.GetAsyncCustomers();
            if (Customers == null || Customers.Count == 0)
            {
                return NotFound();
            }
            else
            {
                Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(Customers));
            }
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(Customers));
            return Customers;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching customers: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

   

}