// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//    tailwindcss(),
//     react()
//   ],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//import dotenv from 'dotenv'

// `.env` faylini yuklash
// dotenv.config()

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    // port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 5173, // `.env` dagi port yoki default 5173
    port: 3007, // 5173 o'rniga 3007 port
    host: true,  // Docker orqali tashqi ulanish uchun
    allowedHosts: ['xorijdaish.asilbro.uz', 'dcid.unicon.uz'] // Tashqi domenni qo'shish
  }
})
