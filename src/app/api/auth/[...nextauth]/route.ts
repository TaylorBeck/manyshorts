import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import * as argon2 from 'argon2';
import { JWT } from 'next-auth/jwt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.hashedPassword) {
          return null;
        }
        try {
          // Check if the password is a valid Argon2 hash
          if (!user.hashedPassword?.startsWith('$argon2')) {
            console.error('Invalid password hash format');
            return null;
          }
          const isPasswordValid = await argon2.verify(
            user.hashedPassword,
            credentials.password
          );
          if (!isPasswordValid) {
            return null;
          }
          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error('Password verification error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    // Add user id to the session
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    }
  },
  pages: {
    // Custom sign-in page
    signIn: '/sign-in'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };