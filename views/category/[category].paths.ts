import taxonomyRoutes from '../../data/taxonomyRoutes.json'

export default {
  paths() {
    return Object.entries(taxonomyRoutes.categories).map(([key, category]) => {
      const categories = key.split('_')
      return {
        params: {
          category,
          key,
          label: categories[categories.length - 1],
        },
      }
    })
  },
}
