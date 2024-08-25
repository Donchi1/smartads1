
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    swcMinify: true,            // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    },
    env:{
        FIREBASE_KEY: process.env.FIREBASE_KEY,
        API_REQUEST_URL: process.env.API_REQUEST_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        APP_URL_DEV: process.env.APP_URL_DEV ,
        APP_URL_DEV:process.env.APP_URL_DEV,
        RAPID_API_KEY:process.env.RAPID_API_KEY,
        RAPID_API_HOST:process.env.RAPID_API_HOST,
        INFURA_URL: process.env.INFURA_URL,
        TRON_PRO_API_KEY :process.env.TRON_PRO_API_KEY,

        TRONWEB_PRIVATE_KEY :process.env.TRONWEB_PRIVATE_KEY
      
      },
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "firebasestorage.googleapis.com",
                   
                  },
              {
                protocol: 'https',
                hostname:'cf.bstatic.com'
                  
              },
            //   {
            //     protocol: 'https',
            //     hostname:'randomuser.me'
                  
            //   },
            ]
          }
};

export default withPWA({
    dest: "public",         // destination directory for the PWA files
    disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);
