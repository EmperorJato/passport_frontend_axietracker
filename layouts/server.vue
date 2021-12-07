<template>
  <v-app>
    <v-main>
      <v-container class="fill-height text-center" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>
<style scoped>
.v-main {
  background-image: url("~/static/img/bg_main.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #23262D;
  color: #fff;
}

</style>

<style>
</style>
