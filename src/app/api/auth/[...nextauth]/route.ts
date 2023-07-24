import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { Utils, envConfigs } from "@/lib/utils"
import Credentials from "next-auth/providers/credentials"
import {prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';
import { USER_ROLE, UserCreate } from "@/const"
import { USER_AUTH_TYPE } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      console.log({user,account,profile,email,credentials});
      let authType=''
      let newUser:UserCreate
      // if it's a new user create an account
      if(account){
       authType=account?.provider?.toUpperCase();
       newUser={
         name:profile?.name as string,
         email:profile?.email as string,

         role:USER_ROLE.BASIC,
         //@ts-ignore
  
  authType:authType
}
// check if user exist

//create user
      }

      return true
    },
  },
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
return null
          }
          const user ={id:'user1',name:'Victory Lucky',email:'me@test.com'}
    
          // If no error and we have user data, return it
          if (user) {
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }}),
        GithubProvider({...envConfigs.github}),
        GoogleProvider(envConfigs.google)
      ]
    
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }