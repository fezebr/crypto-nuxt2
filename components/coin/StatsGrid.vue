<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

    <div class="stat-card light-background rounded-xl p-5">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span class="light-text text-sm">Market Cap</span>
      </div>
      <div class="text-2xl font-bold dark-text">{{ formattedMarketCap }}</div>
      <div
        class="text-sm mt-1"
        :class="marketCapChangePositive ? 'text-green-400' : 'text-red-400'"
      >
        {{ marketCapChangePositive ? '+' : '' }}{{ marketCapChange }}% (24h)
      </div>
    </div>


    <div class="stat-card light-background rounded-xl p-5">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span class="light-text text-sm">24h Volume</span>
      </div>
      <div class="text-2xl font-bold dark-text">{{ formattedVolume }}</div>
      <div class="text-sm light-text mt-1">
        {{ formattedVolumeInCoin }} {{ coin.symbol?.toUpperCase() }}
      </div>
    </div>


    <div class="stat-card light-background rounded-xl p-5">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="light-text text-sm">Circulating Supply</span>
      </div>
      <div class="text-2xl font-bold dark-text">{{ formattedCirculatingSupply }}</div>
      <div class="text-sm light-text mt-1">
        <span v-if="supplyPercentage">{{ supplyPercentage }}% of Total Supply</span>
        <span v-else>Unlimited</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coin: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formattedMarketCap() {
      const marketCap = this.coin.market_data?.market_cap?.usd
      if (!marketCap) return '$0'
      return this.formatCurrency(marketCap)
    },

    marketCapChange() {
      const change = this.coin.market_data?.market_cap_change_percentage_24h
      return change ? change.toFixed(2) : '0.00'
    },

    marketCapChangePositive() {
      return this.coin.market_data?.market_cap_change_percentage_24h >= 0
    },

    formattedVolume() {
      const volume = this.coin.market_data?.total_volume?.usd
      if (!volume) return '$0'
      return this.formatCurrency(volume)
    },

    formattedVolumeInCoin() {
      const volume = this.coin.market_data?.total_volume?.usd
      const price = this.coin.market_data?.current_price?.usd
      if (!volume || !price) return '0'
      return this.formatNumber(volume / price)
    },

    formattedCirculatingSupply() {
      const supply = this.coin.market_data?.circulating_supply
      if (!supply) return '0'
      return this.formatNumber(supply)
    },

    supplyPercentage() {
      const circulating = this.coin.market_data?.circulating_supply
      const total = this.coin.market_data?.total_supply
      if (!circulating || !total) return null
      return ((circulating / total) * 100).toFixed(2)
    },
  },

  methods: {
    formatCurrency(value) {
      if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
      if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
      if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
      return `$${value.toLocaleString()}`
    },

    formatNumber(value) {
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
      if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
      if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
      return value.toLocaleString()
    },
  },
}
</script>

<style scoped>
.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
</style>

