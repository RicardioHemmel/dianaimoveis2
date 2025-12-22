export async function forgetPassword(email: string) {
  const response = await fetch("/api/users/forget-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
}
