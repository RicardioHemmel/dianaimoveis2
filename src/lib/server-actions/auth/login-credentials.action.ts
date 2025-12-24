"use server";

import { signIn } from "@/auth";
import { loginCredentialsSchema } from "@/lib/schemas/auth/credentials.schema";
import { AuthError } from "next-auth";

export async function loginCredentialsAction(
  initialState: any,
  formData: FormData
) {
  //RECOVERS & VALIDATES DATA
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const parsed = loginCredentialsSchema.safeParse({ email, password });

  if (!parsed.success) {
    return {
      fieldsErrors: parsed.error.flatten().fieldErrors,
      email,
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
      const errorMessage = error.cause?.err?.message;
      return {
        message: errorMessage,
        email,
      };
    }
    throw error;
  }
}
