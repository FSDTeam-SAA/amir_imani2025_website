/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------------------------------------------
// ⭐ Create proper interface for decoded JWT payload
// ------------------------------------------------------
interface DecodedToken {
  sub: string; // user ID
  role: string;
  name: string;
  email?: string;
  iat: number;
  exp: number;
}

// ------------------------------------------------------
// NextAuth Handler
// ------------------------------------------------------
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },

      async authorize(credentials) {
        if (!baseUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not defined in environment variables",
          );
        }

        if (credentials?.token) {
          const decoded = jwtDecode<DecodedToken>(credentials.token);

          return {
            id: decoded.sub,
            email: credentials.email || decoded.email || "",
            role: decoded.role,
            name: decoded.name,
            accessToken: credentials.token,
          };
        }

        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Log the URL we're trying to hit for debugging
          // console.log(`Attempting login at: ${baseUrl}/auth/login`);

          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          // console.log("auth login data:", data);

          if (!res.ok) {
            // Forward the actual error message from backend
            throw new Error(data.message || data.error || "Login failed");
          }

          const token = data.data?.token; // Backend returns 'token' or 'accessToken'? Log usage suggests data.data.token above
          if (!token) throw new Error("No token received from backend");

          // ⭐ Decode token using the typed interface
          const decoded = jwtDecode<DecodedToken>(token);

          // Return object must match 'User' interface in next.auth.d.ts
          return {
            id: decoded.sub,
            email: credentials.email,
            role: decoded.role,
            name: decoded.name,
            accessToken: token, // Map backend 'token' to 'accessToken'
          };
        } catch (error: any) {
          console.error("Authorize error:", error.message);
          // Throw the specific error so NextAuth passes it to the client
          throw new Error(
            error?.message && error.message !== "undefined"
              ? error.message
              : "Authentication failed"
          );
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  debug: true, // Always enable debug to see what's happening
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
