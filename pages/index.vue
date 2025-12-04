<template>
  <div class="px-4 md:px-16 py-8">
    <div v-if="!$fetchState.pending">
      <SearchBar v-model="search" class="mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CoinCard
          v-for="(coin, index) in coins"
          :key="coin.id"
          :coin="coin"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '~/components/home/SearchBar.vue'
import CoinCard from '~/components/home/CoinCard.vue'
import { getCoinsMarkets } from '~/apis/coins'

export default {
  data() {
    return {
      coins: [],
      page: 1,
      perPage: 18,
      search: '',
    }
  },
  components: {
    CoinCard,
    SearchBar,
  },

  computed: {
    gainersCount() {
      return this.coins.filter((c) => (c.price_change_percentage_24h || 0) >= 0)
        .length
    },
    losersCount() {
      return this.coins.filter((c) => (c.price_change_percentage_24h || 0) < 0)
        .length
    },
  },

  async fetch() {
    await this.fetchCoins()
  },

  methods: {
    async fetchCoins() {
      try {
        const params = {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: this.perPage,
          page: this.page,
        }

        this.coins = await getCoinsMarkets(this.$axios, params)
      } catch (err) {
        console.error('Error fetching coins:', err)
      }
    },
  },
}
</script>
