<template>
  <div v-if="video">
    <v-row>
      <v-col cols="12" md="8">
        <v-img :aspect-ratio="16/9" cover :src="video.thumbnail" />
      </v-col>
      <v-col cols="12" md="4">
        <h1 class="text-h4 mb-4">{{ video.title }}</h1>
        <p class="mb-4">{{ video.description }}</p>
        <v-btn
          color="primary"
          :to="{ name: '/VideoPlayer/[id]', params: { id: video.id } }"
          x-large
        >
          Watch Now
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const video = ref({
    id: null,
    title: ``,
    description: '',
    thumbnail: ``,
  })

  onMounted(async () => {
    const id = route.query.id as string
    // In a real app, you would fetch video details from your backend here
    // For example:
    // const response = await fetch(`https://your-api.com/videos/${id}`);
    // video.value = await response.json();
    // For now, we'll use mock data:
    video.value = {
      id,
      title: `Video ${id}`,
      description: 'Video description',
      thumbnail: `https://picsum.photos/300/200?random=${id}`,
    }
  })
</script>
