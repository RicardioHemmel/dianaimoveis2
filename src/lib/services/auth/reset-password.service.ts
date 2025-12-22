interface ResetPasswordData {
  newPassword: string;
  userEmail: string;
}

export async function resetPassword({newPassword, userEmail}: ResetPasswordData) {
  const response = await fetch("/api/users/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword, userEmail }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
}
