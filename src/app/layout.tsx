import NavbarComponent from '@/components/navbar/navbar.component'
import './globals.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import FooterComponent from '@/components/footer/footer.component'
import SessionProvider from '@/components/provider/session.provider'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import StoreProvider from '@/components/provider/store.provider';
import { fetchGetPosts } from './page';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const posts = await fetchGetPosts()

  return (
    <html lang="en">
      <body className='font-regular' >
        <StoreProvider>
          <SessionProvider session={session} >
            <NavbarComponent user={session?.user} posts={posts} />
            {children}
            <FooterComponent />
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
