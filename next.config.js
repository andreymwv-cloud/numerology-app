/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	images: {
		unoptimized: true
	},
	experimental: {
		esmExternals: true
	}
}

module.exports = nextConfig
