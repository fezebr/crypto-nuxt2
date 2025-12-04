<template>
  <div class="flex items-center justify-center">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #374151;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
