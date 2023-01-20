export default defineAppConfig({
  apiUri: 'http://localhost:3000',
})

declare module '@nuxt/schema' {
  interface AppConfig {
    apiUri: string
  }
}
