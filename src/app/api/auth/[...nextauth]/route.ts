import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// DB
import User from "@/lib/db/models/user/user";
import connectMongoDB from "@/lib/db/mongodbConnection";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Configs NextAuth to use JWT sessions
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "diana-corretora"
  },
  session: {
    strategy: "jwt",
  },

  // Possible ways to log in
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // Expected fields to log with credentials
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      // Validates if the user is able to log in
      async authorize(credentials): Promise<AuthUser | null> {
        // Connects with MongoDB
        await connectMongoDB();

        // Checks if the credentials were provided
        if (!credentials?.email || !credentials.password) {
          throw new Error("Credenciais inválidas");
        }

        // Searchs user on DB by email
        const user = await User.findOne({ email: credentials.email }).lean();
        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        // If user found checks his password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Senha incorreta");
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
