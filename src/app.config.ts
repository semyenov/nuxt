export default defineAppConfig({
  apiUri: 'http://127.0.0.1:8080',
})

declare module '@nuxt/schema' {
  interface AppConfig {
    apiUri: string
  }
}
