import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

// PROVIDERS
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// DB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

// --- GMAIL WHITELIST ---
const ALLOWED_EMAILS = [
  "ricardohh.websites@gmail.com",
  "hemnelricardo@gmail.com",
];

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
    signIn: "/diana-corretora",
    error: "/diana-corretora",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

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
        await connectMongoDB();

        const ERROR_MSG = "Credenciais inválidas";

        // CHECKS IF THE CREDENTIALS WERE PROVIDED
        if (!credentials?.email || !credentials.password) {
          throw new Error(ERROR_MSG);
        }

        // SEARCHS USER ON DB BY EMAIL
        const user = await User.findOne({ email: credentials?.email }).lean();
        if (!user) {
          throw new Error(ERROR_MSG);
        }

        // IF USER FOUND CHECKS HIS PASSWORD
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password!
        );
        if (!isValid) {
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

  // AFTER SUCCESS ON LOGIN CREATES TOKEN AND SESSION
  callbacks: {
    // CHECK PERMISSION AND CREATE USER IF NECESSARY
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const userEmail = user?.email?.toLowerCase().trim();
        const normalizedWhiteList = ALLOWED_EMAILS.map((email) =>
          email.toLowerCase().trim()
        );

        //IF THE EMAIL IS NOT ON THE LIST, DENY ACCESS IMMEDIATELY.
        if (!userEmail || !normalizedWhiteList.includes(userEmail)) {
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
};

// CREATES THE HANDLER THAT WILL HANDLE THIS API ROUTE WITH THE PREVIOUSLY CONFIG
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
