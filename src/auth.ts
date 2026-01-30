import NextAuth from "next-auth";

// PROVIDERS
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// DB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

// SCHEMA
import { loginCredentialsSchema } from "@/lib/schemas/auth/credentials.schema";

import bcrypt from "bcryptjs";

// --- GMAIL WHITELIST ---
const ALLOWED_GMAILS = process.env.ALLOWED_GMAILS
  ? process.env.ALLOWED_GMAILS.split(",").map((email) =>
      email.trim().toLowerCase(),
    )
  : [];

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// ENV VARIABLES
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// GENERIC ERROR MESSAGE
const ERROR_MSG = "Credenciais inválidas";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
  throw new Error("Env variables not defined");

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/diana-corretora",
    error: "/diana-corretora",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,

  // POSSIBLE WAYS TO LOG IN
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      // VALIDATES IF THE USER IS ABLE TO LOG IN
      async authorize(credentials): Promise<AuthUser | null> {
        const parsed = loginCredentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Dados Inválidos");
        }

        // PARSED DATA WITH ZOD
        const { email, password } = parsed.data;

        await connectMongoDB();

        // SEARCHS USER ON DB BY EMAIL
        const user = await User.findOne({ email }).select("+password").lean();
        if (!user) {
          throw new Error(ERROR_MSG);
        }

        if (!user.password) {
          throw new Error(ERROR_MSG);
        }

        // IF USER FOUND CHECKS HIS PASSWORD
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error(ERROR_MSG);
        }

        // RETURN DATA TO USE IN THE SESSION WITHOUT PASSWORD
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      name: "Google",
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  // AFTER SUCCESS ON LOGIN CREATES TOKEN AND SESSION
  callbacks: {
    // CHECK PERMISSION AND CREATE USER IF NECESSARY
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const userEmail = user?.email?.toLowerCase().trim();

        //IF THE EMAIL IS NOT ON THE LIST, DENY ACCESS IMMEDIATELY.
        if (!userEmail || !ALLOWED_GMAILS.includes(userEmail)) {
          console.log(`Acesso negado para: ${user.email}`);
          // USED TO VALIDATE ERROR BASED ON URL ON FRONTEND
          throw new Error("AccessDenied");
        }

        try {
          await connectMongoDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name ?? "Google User",
              email: userEmail,
              role: "admin",
              // No password
            });
          }
          return true;
        } catch (error) {
          console.error("Erro ao salvar usuário Google:", error);
          return false;
        }
      }
      //FOR CREDENTIALS, VALIDATION HAS ALREADY OCCURRED IN AUTHORIZE, SO IT RETURNS TRUE
      return true;
    },

    // SEARCH REAL DB ID AND ROLE TO ENSURE CONSISTENCY
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          // CONNECT TO GET THE REAL MONGO _ID AND ROLE (WHICH MAY HAVE CHANGED)
          await connectMongoDB();
          const dbUser = await User.findOne({ email: user.email }).lean();

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
          }
        } else {
          //LOGIN VIA CREDENTIALS ALREADY COMES WITH EVERYTHING FILLED IN THE AUTHORIZE
          token.id = user.id;
          token.role = (user as AuthUser).role;
        }
      }
      return token;
    },

    // CREATES SESSION WITH TOKEN DATA
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
