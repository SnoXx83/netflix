import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/nestflux/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signup: resolve(__dirname, 'src/Auth/SignupPage.html'),
        signin: resolve(__dirname, 'src/Auth/SigninPage.html'),
        session: resolve(__dirname, 'src/user/Session.html'),
        profil: resolve(__dirname, 'src/user/Profile.html'),
      },
    },
  },
});