import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                mail_address: { label: 'Email', type: 'text', placeholder: 'Mail Adresi' },
                password: { label: 'Password', type: 'password', placeholder: 'Şİfreniz' }
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        mail_address: credentials?.mail_address,
                        password: credentials?.password
                    })
                })

                const { ok, user } = await res.json()

                if (ok) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/'
    },
    session: {
        jwt: true,
        maxAge: 60 * 60
    },
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            session.jwt = token.jwt
            session.user.id = token.id,
            session.user.role = token.role
            session.user.avatar = token.avatar ||"https://res.cloudinary.com/dssep9ze1/image/upload/f_auto,q_auto/v1/brkshn/zobijxchgxvxpafuijoj"
            return Promise.resolve(session)
        },
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id,
                token.role = user.role,
                token.name = user.name,
                token.surname = user.surname
                token.isActive = user.isActive
                token.avatar = user?.avatar?.url ||"https://res.cloudinary.com/dssep9ze1/image/upload/f_auto,q_auto/v1/brkshn/zobijxchgxvxpafuijoj"
            }

            return Promise.resolve(token)
        }
    }
}

export default NextAuth(authOptions)