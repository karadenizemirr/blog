/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                

            },
        ],
        domains: ['res.cloudinary.com']
    }
}

module.exports = nextConfig
