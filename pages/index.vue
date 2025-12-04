<template>
  <div class="px-4 md:px-16 py-8">
    <SearchBar
      v-model="search"
      @input="onSearchInput"
    />
  </div>
</template>

<script>
import SearchBar from '~/components/home/SearchBar.vue'

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    onSearchInput() {
    console.log(this.search)
    }
  }
}
</script>
