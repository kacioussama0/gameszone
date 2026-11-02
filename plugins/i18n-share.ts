// Share previews (og/twitter tags) are written in English whatever the visitor's
// language, so the English messages are loaded next to the current ones
export default defineNuxtPlugin({
  name: 'i18n-share',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    await nuxtApp.$i18n.loadLocaleMessages('en')
  },
})
