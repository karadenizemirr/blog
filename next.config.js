/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol:'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    experimental: {
        typedRoutes: true,
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
