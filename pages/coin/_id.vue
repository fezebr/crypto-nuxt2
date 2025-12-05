<template>
  <div class="coin-detail-page">
    <!-- Loading State -->
    <Loading v-if="$fetchState.pending" />

    <div v-else class="px-4 md:px-16 py-8">
      <nuxt-link
        to="/"
        class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to List</span>
      </nuxt-link>

      <CoinDetail :coin="coin" />
      <PriceChart :prices="chartData" :loading="chartLoading" />
      <StatsGrid :coin="coin" />
      <AboutCoin :coin="coin" />
    </div>
  </div>
</template>

<script>
import { getCoinDetails, getCoinMarketChart } from '~/apis/coins'
import Loading from '~/components/shared/Loading.vue'
import CoinDetail from '~/components/coin/CoinDetail.vue'
import PriceChart from '~/components/coin/PriceChart.vue'
import StatsGrid from '~/components/coin/StatsGrid.vue'
import AboutCoin from '~/components/coin/AboutCoin.vue'

export default {
  components: {
    Loading,
    CoinDetail,
    PriceChart,
    StatsGrid,
    AboutCoin,
  },

  data() {
    return {
      coin: {},
      chartData: [],
      chartLoading: false,
    }
  },

  async fetch() {
    const coinId = this.$route.params.id

    try {
      const [coinDetails, marketChart] = await Promise.all([
        getCoinDetails(this.$axios, coinId),
        getCoinMarketChart(this.$axios, coinId, 7),
      ])

      this.coin = coinDetails
      this.chartData = marketChart.prices || []
    } catch (error) {
      console.error('Error', error)
      throw error
    }
  },
}
</script>

<style scoped>
.coin-detail-page {
  min-height: 60vh;
}
</style>
