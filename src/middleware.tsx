import { withAuth } from "next-auth/middleware";

export default withAuth(
    {
        callbacks:{
            authorized: ({token}) => token?.role === 'admin' ||token?.role==='user'||token?.role==='editor'
        }
    }
)

export const config = {matcher:[
    '/category',
    '/comments',
    '/posts',
    '/user/list',
    '/user/profile',
    '/user/post/add',
    '/user/post/list',
    '/user/post/update'
]}