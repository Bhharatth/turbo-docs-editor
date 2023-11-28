import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env";
import { db } from "@/server/db";
import { loginSchema, signUpSchema } from "@/common/authSchema";
import { comparePassword } from "@/utils/passwordUtils";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      userName: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
  }

  interface User {
    // ...other properties
    userName: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({token,user}){
      if(user){
        token.id = user.id;
        token.name = user.userName
      }
      return token;
    },
    session({session, token, user}){
      if(session.user){
        session.user.email = token.email as string
        // session.user.name = token.name as string
        session.user.userName = token.name as string
      }
      return session
    }
  },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const creds = await loginSchema.parseAsync(credentials);
        const user = await db.user.findFirst({
          where: { email: creds.email },
          select: {
            id: true,
            userName: true,
            email: true,
            password: true,
          }
        },);
        console.log(user)

        if (!user) {
          return null
        };
        console.log('user not null')
        if(creds.password && user.password){
          const isCorrectPassword = await bcrypt.compare(
            creds.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }
        }else{
          throw new Error('Invalid credentials');
        }

       

        if (user) {
          console.log("User logged in : ", user);
        }

        return {
          ...user,
        }
      },
    }),
  ],
  pages: {
    signIn: "loginpage",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  session: {
    strategy: "jwt"
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
