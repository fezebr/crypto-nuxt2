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
      <StatsGrid :coin="coin" />
    </div>
  </div>
</template>

<script>
import { getCoinDetails } from '~/apis/coins'
import Loading from '~/components/shared/Loading.vue'
import CoinDetail from '~/components/coin/CoinDetail.vue'
import StatsGrid from '~/components/coin/StatsGrid.vue'

export default {
  components: {
    Loading,
    CoinDetail,
    StatsGrid,
  },

  data() {
    return {
      coin: {},
      chartData: [],
    }
  },

  async fetch() {
    const coinId = this.$route.params.id

    try {
      this.coin = await getCoinDetails(this.$axios, coinId)
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

.description-content {
  text-align: justify;
}

.description-content :deep(a) {
  color: #60a5fa;
  text-decoration: underline;
}

.description-content :deep(a:hover) {
  color: #93c5fd;
}
</style>
