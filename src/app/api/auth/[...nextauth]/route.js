import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const userList = [
  { name: "hablu", password: "1234" },
  { name: "dablu", password: "1234" },
  { name: "bablu", password: "1234" },
  { name: "kablu", password: "1234" },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "email and password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // my own login logic
        // const user = userList.find((u) => u.name == username);
        const user = await dbConnect("users").findOne({ email });
        if (!user) return null;

        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (isPasswordOk) {
          return user;
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl
  // },
  async session({ session, token, user }) {
    if(token){
      session.role=token.role;
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if(user){
      token.email=user.email
      token.role=user.role
    }
    return token
  }
}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// 72.2 start login
