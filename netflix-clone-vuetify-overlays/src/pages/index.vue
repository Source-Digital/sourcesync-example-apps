<template>
  <div>
    <h1 class="text-h4 mb-6">Popular Videos</h1>
    <v-row>
      <v-col
        v-for="video in videos"
        :key="video.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card hover :to="{ name: '/VideoDetails/[id]', params: { id: video.id } }">
          <v-img :aspect-ratio="16 / 9" cover :src="video.thumbnail" />
          <v-card-title>{{ video.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  // Mock data - replace this with actual API calls to your backend
  const videos = ref([
    { id: '1', title: 'Video 1', thumbnail: 'https://picsum.photos/300/200' },
    { id: '2', title: 'Video 2', thumbnail: 'https://picsum.photos/300/201' },
    // Add more mock videos as needed
  ])

  onMounted(async () => {
    // In a real app, you would fetch videos from your backend here
    // For example:
    // const response = await fetch('https://your-api.com/videos');
    // videos.value = await response.json();
  })
</script>
