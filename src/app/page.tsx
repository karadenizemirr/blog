import HomeContainer from '@/components/home.container'
import { fetchGetAllCategory } from './(user)/user/post/add/page'


export const fetchGetPosts = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=homePosts', { method: 'GET', cache: 'default' })

    const { ok, data } = await res.json()

    if (ok) return data
    else return []

  } catch (err) {
    return []
  }
}


export default async function Home() {
  const posts = await fetchGetPosts()
  const categories = await fetchGetAllCategory()
  return (
    <div>
      <HomeContainer posts={posts} categories={categories} />
    </div>
  )
}