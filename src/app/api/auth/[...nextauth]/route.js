import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        secretCode: {
          label: "Secret Code",
          type: "number",
          placeholder: "enter code",
        },
      },
      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;
        // my own login logic
        const user = userList.find((u) => u.name == username);
        if(!user) return null

        const isPasswordOk = user.password==password;
        if(isPasswordOk){
          return user
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// 72.2 start login
