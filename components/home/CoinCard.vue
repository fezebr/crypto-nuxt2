<template>
  <nuxt-link
    :to="`/coin/${coin.id}`"
    class="coin-card light-background group relative rounded p-5 transition-all duration-300"
    :style="{ animationDelay: `${index * 50}ms` }"
  >
    <div class="relative flex items-center gap-4">
      <img
        :src="coin.image"
        :alt="coin.name"
        class="w-12 h-12 rounded-full ring-2 ring-gray-700"
      />

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-semibold dark-text truncate">{{ coin.name }}</h3>
          <span
            class="text-xs font-medium light-text uppercase light-background px-2 py-0.5 rounded-md"
          >
            {{ coin.symbol }}
          </span>
        </div>

        <p class="text-sm light-text">
          Vol: <span class="dark-text">{{ formattedVolume }}</span>
        </p>
      </div>

      <div class="text-right">
        <p class="text-lg font-semibold dark-text mb-1">{{ formattedPrice }}</p>

        <div
          class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium"
          :class="changeClasses"
        >
          <svg
            class="w-3 h-3"
            :class="{ 'rotate-180': !isPositive }"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
          </svg>
          {{ formattedChange }}%
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    coin: Object,
    index: Number,
  },

  computed: {
    isPositive() {
      return (this.coin.price_change_percentage_24h ?? 0) >= 0
    },

    changeClasses() {
      return this.isPositive
        ? 'bg-green-500/0 text-green-400'
        : 'bg-red-500/0 text-red-400'
    },

    formattedPrice() {
      const price = this.coin.current_price || 0
      const opts = {
        minimumFractionDigits: 2,
        maximumFractionDigits: price >= 1 ? 2 : 6,
      }
      return '$' + price.toLocaleString('en-US', opts)
    },

    formattedVolume() {
      const v = this.coin.total_volume || 0
      if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`
      if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`
      if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`
      return `$${v}`
    },

    formattedChange() {
      return Math.abs(this.coin.price_change_percentage_24h ?? 0).toFixed(2)
    },
  },
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.coin-card {
  animation: fadeInUp 0.5s ease-out both;
}
</style>
