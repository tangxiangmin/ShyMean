import taxonomyRoutes from '../../data/taxonomyRoutes.json'

export default {
  paths() {
    return Object.entries(taxonomyRoutes.tags).map(([label, tag]) => ({
      params: {
        tag,
        label,
      },
    }))
  },
}
