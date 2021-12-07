<template>
  <v-app />
</template>

<script>
export default {
  middleware: ['auth'],
  created () {
    this.$vuetify.theme.dark = localStorage.getItem('theme') === 'true'
  }
}
</script>

<style scoped>
/*
#app {
    background-color: var(--v-background-base);
} */
</style>
