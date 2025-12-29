// AUTH HELPERS
import { auth } from "@/auth";

export async function getSession() {
  return auth();
}

export async function requireSession() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function getUser() {
  const session = await auth();
  return session?.user ?? null;
}
