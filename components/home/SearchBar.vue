<template>
  <div class="relative w-full md:w-96">
    <svg
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      :value="value"
      placeholder="Search..."
      @input="onInput"
      type="text"
      class="w-full px-6 pl-12 py-4 rounded shadow text-sm dark-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 light-background"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
