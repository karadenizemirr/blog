/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol:'https',
                hostname: 'res.cloudinary.com'
            }
        ],
        domains:['res.cloudinary.com'],
        formats:['image/webp']
    },
    experimental: {
        typedRoutes: true,
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
