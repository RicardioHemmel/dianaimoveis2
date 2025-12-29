"use server";

import { signIn } from "@/auth";

export async function loginGoogleAction(): Promise<void> {
  await signIn("google", {
    callbackUrl: "/dashboard",
  });
}
