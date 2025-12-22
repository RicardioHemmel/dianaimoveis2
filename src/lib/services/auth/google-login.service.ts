import { signIn } from "next-auth/react";

export async function googleLogin() {
  return await signIn("google", {
    callbackUrl: "/dashboard",
  });
}
