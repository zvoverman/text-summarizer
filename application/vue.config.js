const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Text Summarizer',
      icon: './assets/monstera-leaf.svg',
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.electron.summary',
        productName: 'Text Summarizer',
        linux: {
          icon: 'src/assets/monstera-leaf.svg',
          category: 'Utility',
        }
      }
    }
  }
})
