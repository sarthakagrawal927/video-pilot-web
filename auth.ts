import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { getUserById } from "@/lib/user"

export const { 
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },
  callbacks: {
    async signIn(message) {
      /*
      {
  message: {
    user: {
      id: '19e50340-3126-4f1b-a697-24a6bf8fde22',
      name: 'Sarthak Agrawal',
      email: 'sarthakagrawal927@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocK4NgzJQmR5BR0hh_HHxLfZdCxgCXkJVERkcfPrK1zePlndoXT7=s96-c'
    },
    account: {
      access_token: 'ya29.a0AXooCgurcDOhK9h8g4AYhPHi8FGHyj-46xdBAlQZGkYSsjorEvBnZNv6_3NLxOezldvQNL0cq17hP_vy20YWwg3M3QU5XSIlZAGxa5MSe97_CWdCOqwY55PDUtl_SldOWOiUZMbHFG0R-QfpxGtmN7YFNvZYif0LSabxaCgYKAd0SARISFQHGX2MixtX4_PBJwa_a-f0WfTTSHA0171',
      expires_in: 3599,
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
      token_type: 'bearer',
      id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3MTk2NzgzNTFhNWZhZWRjMmU3MDI3NGJiZWE2MmRhMmE4YzRhMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTY3Nzg1NDYyOTAtcGs1NGRrdGtxcXNubzMxYjQxOGJjbHQ3bGhmZ2E4b3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTY3Nzg1NDYyOTAtcGs1NGRrdGtxcXNubzMxYjQxOGJjbHQ3bGhmZ2E4b3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTA5OTQ1MzQ3NDM4MDg3MDI3ODkiLCJlbWFpbCI6InNhcnRoYWthZ3Jhd2FsOTI3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYlhLaC03Z1FpQlBLWmI1MXNaQWlNdyIsIm5hbWUiOiJTYXJ0aGFrIEFncmF3YWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSzROZ3pKUW1SNUJSMGhoX0hIeExmWmRDeGdDWGtKVkVSa2NmUHJLMXplUGxuZG9YVDc9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2FydGhhayIsImZhbWlseV9uYW1lIjoiQWdyYXdhbCIsImlhdCI6MTcxNzE2ODIyMiwiZXhwIjoxNzE3MTcxODIyfQ.ehwErb7IrIxqNxqq5GRMaubStTEnm1CDrpFD3C_sNTpO43yqOuvumg2NfuGo4oabqrg6w6_RbLkulHeKmQwfVsZYoZKyZj3iK6yY7EcDJKCc9N_TVZJhrRsz13gmoNitRTm-THVPWMVGOdEdViQubMVqilXmTORx7arMlnQxWl16wLluV6CNqxVuvF-otgFPCos84dlMxh4SUVXmhxxE1CB50S7GSnIlSVYhgu3Ljnxq4So5rXt4gyQ7bMPgZXaZSMsTr8ykk8oYER9WsJ38luPdCok4oOhWf28sK9YUzxZYrzCOZrJoS3dfrtdYkJdt3CinIyVBNQz0ca5p0HMsZQ',
      expires_at: 1717171821,
      provider: 'google',
      type: 'oidc',
      providerAccountId: '110994534743808702789'
    },
    profile: {
      iss: 'https://accounts.google.com',
      azp: '616778546290-pk54dktkqqsno31b418bclt7lhfga8oq.apps.googleusercontent.com',
      aud: '616778546290-pk54dktkqqsno31b418bclt7lhfga8oq.apps.googleusercontent.com',
      sub: '110994534743808702789',
      email: 'sarthakagrawal927@gmail.com',
      email_verified: true,
      at_hash: 'bXKh-7gQiBPKZb51sZAiMw',
      name: 'Sarthak Agrawal',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocK4NgzJQmR5BR0hh_HHxLfZdCxgCXkJVERkcfPrK1zePlndoXT7=s96-c',
      given_name: 'Sarthak',
      family_name: 'Agrawal',
      iat: 1717168222,
      exp: 1717171822
    }
  }
} */
      // Save something to backend
      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub);

      if (!dbUser) return token;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;

      return token;
    },
  },
  ...authConfig,
  // debug: process.env.NODE_ENV !== "production"
})