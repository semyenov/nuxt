declare module '@nuxt/schema' {
  interface AppConfig {
    apiUri: string
  }
}

export default defineAppConfig({
  apiUri: 'http://localhost:3000',
})
