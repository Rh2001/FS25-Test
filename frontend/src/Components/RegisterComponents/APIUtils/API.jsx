export const createUser = async (user) => {
  const URL = "https://localhost:443";

  const res = await fetch(`${URL}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }

    if (res.status === 555) {
      throw new Error(555); // Throw custom error code for frontend
    }

    throw new Error(body?.message || `Request failed: ${res.status}`);
  }

  return await res.json();
};
