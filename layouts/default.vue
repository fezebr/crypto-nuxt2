<template>
  <div class="min-h-screen dark-background">
    <AppHeader />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import AppHeader from '~/components/home/AppHeader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
  },
}
</script>
