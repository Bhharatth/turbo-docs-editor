import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid Credentials');
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
  
          if (!user || !user?.hashedPassword) {
            throw new Error('Invalid credentials')
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          )

          if(!isCorrectPassword){
            throw new Error('Invalid passwords')
          }
  
          // You need to return the user object if the credentials are valid
          return user;
        }
      })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
  };