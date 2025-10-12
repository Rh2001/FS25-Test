import { useEffect, useState } from "react";

function TestComponent() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5148/api/customer")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id || customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email || "N/A"}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
     
    </div>
  );
}

export default TestComponent;