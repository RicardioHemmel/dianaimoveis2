import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

// PROVIDERS
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// DB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// ENV VARIABLES
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
  throw new Error("Env variables not defined");

// CONFIGS NEXTAUTH TO USE JWT SESSIONS
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "diana-corretora",
  },
  session: {
    strategy: "jwt",
  },

  // POSSIBLE WAYS TO LOG IN
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // EXPECTED FIELDS TO LOG WITH CREDENTIALS
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      // VALIDATES IF THE USER IS ABLE TO LOG IN
      async authorize(credentials): Promise<AuthUser | null> {
        // Connects with MongoDB
        await connectMongoDB();

        const ERROR_MSG = "Credenciais inválidas"

        // Checks if the credentials were provided
        if (!credentials?.email || !credentials.password) {
          throw new Error(ERROR_MSG);
        }

        // Searchs user on DB by email
        const user = await User.findOne({ email: credentials?.email }).lean();
        if (!user) {
          throw new Error(ERROR_MSG);
        }

        // If user found checks his password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error(ERROR_MSG);
        }

        // Return data to use in the session without password
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

  // After success on login creates token and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};

// Creates the handler that will handle this API route with the previously config
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
