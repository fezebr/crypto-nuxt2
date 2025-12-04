<template>
  <div class="coin-detail-page">
    <!-- Loading State -->
    <div v-if="$fetchState.pending" class="flex items-center justify-center min-h-[60vh]">
      <Loading />
    </div>

    <div v-else class="px-4 md:px-16 py-8">

      <nuxt-link
        to="/"
        class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to List</span>
      </nuxt-link>


    </div>
  </div>
</template>

<script>
import { getCoinDetails } from '~/apis/coins'
import Loading from '~/components/shared/Loading.vue'

export default {
  components: {
    Loading,
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
