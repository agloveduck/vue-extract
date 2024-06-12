module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.108.119.86:5000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
