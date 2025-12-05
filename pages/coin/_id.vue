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

      <div class="coin-header light-background rounded-2xl p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                :src="coin.image?.large"
                :alt="coin.name"
                class="w-20 h-20 rounded-full ring-4 ring-gray-700"
              />
              <div
                class="absolute -bottom-1 -right-1 px-2 py-0.5 text-xs font-bold rounded-full bg-gray-700 dark-text"
              >
                #{{ coin.market_cap_rank }}
              </div>
            </div>

            <div>
              <h1 class="text-3xl font-bold dark-text">{{ coin.name }}</h1>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-lg font-medium light-text uppercase">{{
                  coin.symbol
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsGrid :coin="coin" />
    </div>
  </div>
</template>

<script>
import { getCoinDetails } from '~/apis/coins'
import Loading from '~/components/shared/Loading.vue'
import StatsGrid from '~/components/coin/StatsGrid.vue'

export default {
  components: {
    Loading,
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

.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.coin-header {
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
