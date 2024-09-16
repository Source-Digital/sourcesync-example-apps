<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { routes } from './router/routes'
</script>

<template>
  <main class="container-fluid app-root">
    <div class="grid">
      <aside class="app-root__aside">
        <header>
          <h6 style="margin-bottom: 0;">SourceSync SDK</h6>
          <h3>Content Examples</h3>
        </header>
        <ul>
          <li v-for="route in routes.filter(i => i.title)" :key="route.path">
            <RouterLink :to="{ name: route.name }">{{ route.title }}</RouterLink>
          </li>
        </ul>
      </aside>
      <section >
        <RouterView />
      </section>
    </div>
  </main>
</template>

<style scoped>
.app-root {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
}
.app-root > .grid {
  height: 100%;
  grid-template-columns: 25% auto;
}
.app-root__aside, .app-root__aside > article {
  height: 100%;
}
</style>