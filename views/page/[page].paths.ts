import articles from '../../data/meta.json'

export default {
  async paths() {
    const list = articles
    const pageSize = 20
    const total = Math.ceil(list.length / pageSize)
    const pages = []
    for (let i = 1; i <= total; ++i) {
      pages.push({
        params: { page: i },
        // content: {
        //   current: i,
        //   // articles,
        // },
      })
    }
    return pages
  },
}
