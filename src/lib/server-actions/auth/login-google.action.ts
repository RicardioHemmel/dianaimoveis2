"use server";

import { signIn } from "@/auth";

export async function loginGoogleAction() {
  await signIn("google", {
    callbackUrl: "/dashboard",
  });
}
