<template>
  <div class="px-4 md:px-16 py-8">
    <div
      v-if="$fetchState.pending"
      class="flex items-center justify-center min-h-[60vh]"
    >
      <Loading />
    </div>
    <div v-else>
      <SearchBar v-model="search" class="mb-6" />

      <div
        v-if="filteredCoins.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <h3 class="text-xl font-semibold dark-text mb-2">No coins found</h3>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CoinCard
          v-for="(coin, index) in filteredCoins"
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
import Loading from '~/components/shared/Loading.vue'
import { getCoinsMarkets } from '~/apis/coins'

export default {
  data() {
    return {
      coins: [],
      page: 1,
      perPage: 18,
      search: '',
      debouncedSearch: '',
      debounceTimer: null,
    }
  },
  components: {
    CoinCard,
    SearchBar,
    Loading,
  },

  watch: {
    search(newVal) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }
      this.debounceTimer = setTimeout(() => {
        this.debouncedSearch = newVal
      }, 300)
    },
  },

  computed: {
    filteredCoins() {
      if (!this.debouncedSearch.trim()) {
        return this.coins
      }
      const query = this.debouncedSearch.toLowerCase().trim()
      return this.coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      )
    },
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

  beforeDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
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
