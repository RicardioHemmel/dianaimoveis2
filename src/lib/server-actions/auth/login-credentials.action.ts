"use server";

import { signIn } from "@/auth";
import { loginCredentialsSchema } from "@/lib/schemas/auth/credentials.schema";
import ServerActionResponse from "@/lib/types/server-action-response";
import { AuthError } from "next-auth";


export interface LoginCredentialsResponse extends ServerActionResponse {
  email?: string;
}

export async function loginCredentialsAction(
  _: unknown,
  formData: FormData
): Promise<LoginCredentialsResponse> {
  //RECOVERS & VALIDATES DATA
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const parsed = loginCredentialsSchema.safeParse({ email, password });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      email: email ?? "",
    };
  }

  const credentials = {
    email: parsed.data.email,
    password: parsed.data.password,
  };

  // ATTEMPT SIGN IN
  try {
    await signIn("credentials", {
      ...credentials,
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: error.cause?.err?.message,
        email: parsed.data.email,

      };
    }
    throw error;
  }

  // Default return if signIn does not throw and does not redirect
  return {
    success: true,
    email: parsed.data.email
  };
}
