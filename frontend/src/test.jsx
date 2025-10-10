import { useEffect, useState } from "react";

function TestComponent() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5148/api/API/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestComponent;