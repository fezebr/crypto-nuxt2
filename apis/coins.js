export const getCoinsMarkets = (axios, params) => {
  return axios.$get('/coins/markets', { params })
}

export const getCoinDetails = (axios, coinId) => {
  return axios.$get(`/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  })
}

export const getCoinMarketChart = (axios, coinId, days = 7) => {
  return axios.$get(`/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
    },
  })
}

