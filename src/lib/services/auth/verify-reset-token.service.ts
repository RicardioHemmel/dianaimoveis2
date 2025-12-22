export async function verifyResetToken(token: string) {
  if (!token) throw new Error("Token ausente");

  const response = await fetch("/api/users/verify-reset-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result.email;
}
