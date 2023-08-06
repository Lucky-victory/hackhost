import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { Utils } from "@/lib/utils";
import { envConfigs } from "@/lib/env-config";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { USER_ROLE, UserCreate } from "@/const";
import { USER_AUTH_TYPE } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials });

      if (account) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: profile?.email,
          },
        });

        // if it's a new user create an account
        if (!existingUser) {
          let authType: keyof typeof USER_AUTH_TYPE;

          const type =
            account?.provider?.toUpperCase() as keyof typeof USER_AUTH_TYPE;
          authType = USER_AUTH_TYPE[type];
          const newUser: UserCreate = {
            id: profile?.sub,
            name: profile?.name as string,
            email: profile?.email as string,
            avatar: user?.image,
            role: USER_ROLE.BASIC,
            authType: authType,
            //@ts-ignore
            username: profile?.username
              ? //@ts-ignore
                profile?.username
              : Utils.genUsername(profile?.name),
          };

          await prisma.user.create({
            data: newUser,
          });
        }
        return true;
      }

      return true;
    },
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        //@ts-ignore
        token.id = user.id;
        //@ts-ignore
        token.role = user?.role;
        //@ts-ignore
        token.username = user?.username;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      if (token) {
        //@ts-ignore
        session.user.id = token.id;
        //@ts-ignore
        session.user.role = token.role;
        //@ts-ignore
        session.user.username = token.username;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      name: "",

      credentials: {
        type: {},
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "John Smith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        // if it's a new user create an account
        if (!existingUser && credentials?.type === "create") {
          const hashedPassword = await bcrypt.hash(
            credentials?.password as string,
            10,
          );
          const newUser: UserCreate = {
            name: credentials?.name as string,
            email: credentials?.email as string,
            password: hashedPassword,
            role: USER_ROLE.BASIC,
            authType: "CREDENTIALS",
            username: Utils.genUsername(credentials?.name),
          };

          const createdUser = await prisma.user.create({
            data: newUser,
          });

          return createdUser;
        }

        if (!existingUser) throw new Error("Invalid Credentials");
        // compare the password
        const isValidPassword = await bcrypt.compare(
          credentials?.password as string,
          existingUser?.password as string,
        );
        if (!isValidPassword) {
          // Return null if password does not match

          return null;
        }
        return existingUser;
      },
    }),
    GithubProvider({
      ...envConfigs.github,
      profile(profile, tokens) {
        return {
          ...profile,
          username: Utils.genUsername(profile?.name),
        };
      },
    }),
    GoogleProvider({
      ...envConfigs.google,
      profile(profile, tokens) {
        return {
          ...profile,
          username: Utils.genUsername(profile?.name),
        };
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
