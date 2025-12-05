<template>
  <div class="coin-header light-background rounded-2xl p-6 mb-6">
    <div class="flex flex-col md:flex-row md:items-center gap-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <img
            :src="coin.image?.large"
            :alt="coin.name"
            class="w-20 h-20 rounded-full ring-4 ring-gray-700"
          />

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
</template>

<script>
export default {
  props: {
    coin: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
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
</style>

