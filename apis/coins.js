export const getCoinsMarkets = (axios, params) => {
  return axios.$get('/coins/markets', { params })
}

