<template>
  <div
    class="min-h-screen bg-gray-800 dark-text overflow-hidden max-w-10xl mx-auto px-4 md:px-16"
  >
    <!-- <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> -->
      <AppHeader />
    <!-- </div> -->
  </div>
</template>

<script>
import AppHeader from '../components/home/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },
}
</script>
