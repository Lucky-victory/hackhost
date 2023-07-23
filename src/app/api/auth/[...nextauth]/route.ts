import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { Utils, envConfigs } from "@/lib/utils"
import Credentials from "next-auth/providers/credentials"
import {prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers:[
    Credentials({   
        name: 'Sign In',
        
        credentials: {
          email: { label: "E-mail", type: "text", placeholder: "jsmith@test.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          
          const u=await prisma.user.findFirst({
            where:{
                email:credentials?.email
            }
          })
          console.log({auth:u});
          if(u && !Utils.checkAuthType(u.authType).isCredentials){
return ''
          }
          const user ={id:'user1',name:'Victory Lucky',email:'me@test.com'}
    
          // If no error and we have user data, return it
          if (user) {
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }}),
        GithubProvider(envConfigs.github),
        GoogleProvider(envConfigs.google)
      ]
    
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }