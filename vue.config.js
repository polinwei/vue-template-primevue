module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-template-primevue/' : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}