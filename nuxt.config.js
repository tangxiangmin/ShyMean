module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '橙红年代',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'shymean前端开发个人博客,专注web前端、后端开发技术，总结工作经历及心得。' },
        { hid: 'keywords', name: 'keywords', content: 'shymean,橙红年代,前端开发,个人博客,HTML,CSS,JavaScript' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
      {
          src: '~assets/scss/blog.scss',
          lang: "scss"
      },
      '~assets/fonts/iconfont.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  }
}
