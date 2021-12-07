<template>
  <section id="error">
    <div align="center">
      <h1 style="font-size: 3em">
        SERVER ERROR
      </h1>
      <v-img src="img/server_error.svg" max-width="500" />
      <h4 class="mt-5">
        <NuxtLink to="/dashboard">
          Back to dashboard
        </NuxtLink>
      </h4>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error',
  layout: 'server',
  head () {
    return {
      title: 'Error'
    }
  }
}
</script>

<style scoped>
</style>
