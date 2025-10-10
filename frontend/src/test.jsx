import { useEffect } from "react";

function TestComponent() {
  useEffect(() => {
    fetch("http://localhost:5148/api/API")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>Check the console for API response.</div>;
}

export default TestComponent;