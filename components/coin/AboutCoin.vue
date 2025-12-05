<template>
  <div v-if="description" class="light-background rounded-xl p-5 mb-6">
    <h3 class="text-lg font-semibold dark-text mb-4 flex items-center gap-2">
      <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      About {{ coin.name }}
    </h3>
    <div
      class="description-content light-text leading-relaxed text-sm"
      v-html="description"
    ></div>
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
    description() {
      return this.coin.description?.en || null
    },
  },
}
</script>

<style scoped>
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

