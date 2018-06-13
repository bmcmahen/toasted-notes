module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactToast',
      externals: {
        react: 'React'
      }
    }
  }
}
