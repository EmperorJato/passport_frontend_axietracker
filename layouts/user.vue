<template>
  <v-app>
    <Navigation />
    <v-main>
      <Alert />
      <v-container fluid>
        <Nuxt />
      </v-container>
      <Snackbar />
    </v-main>
  </v-app>
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
.v-alert {
  position: fixed !important;
  z-index: 99999;
  right: 0;
  margin-right: 1%;
  margin-top: 1%;
}
</style>
