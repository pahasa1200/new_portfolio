module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "src/styles/main.scss";',
      },
      scss: {
        prependData: '@import "src/styles/main.scss";',
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'assets/locales',
      enableInSFC: true,
    },
  },
};
