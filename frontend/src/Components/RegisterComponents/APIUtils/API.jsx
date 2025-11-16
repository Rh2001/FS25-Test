export const createUser = async (user, role = null) => { // Default role is null, backend will assign default role if none is provided
  const URL = "https://localhost:443";

  const res = await fetch(`${URL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( user ),  
  });

  console.log("Create user response status:", res.status);

  if (!res.ok) {
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }

    if (body?.errors) {
      const messages = Object.values(body.errors).flat().join("; ");
      throw new Error(messages || JSON.stringify(body));
    }

    throw new Error(`Request failed: ${res.status}`);
  }

  
  const result = await res.json();

  // Return the created user 
  return result;
};
