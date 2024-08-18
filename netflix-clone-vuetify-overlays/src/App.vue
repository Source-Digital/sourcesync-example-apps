<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title>
        <router-link class="text-h4 text-white text-decoration-none" to="/">
          NetflixClone
        </router-link>
      </v-app-bar-title>
      <v-spacer />
      <v-btn to="/" type="text">Home</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
