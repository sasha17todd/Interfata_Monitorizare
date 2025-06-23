import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Reciclare Dashboard',
        short_name: 'Rubster',
        start_url: '/',
        display: 'standalone',
        icons: [
          { src:'/icon-192.png', sizes:'192x192', type:'image/png' },
          { src:'/icon-512.png', sizes:'512x512', type:'image/png' }
        ]
      }
    })
  ]
});
