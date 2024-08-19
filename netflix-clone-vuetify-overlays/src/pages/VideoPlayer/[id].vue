<template>
  <div v-if="video">
    <div class="position-relative">
      <video
        ref="videoRef"
        class="w-100"
        :poster="video.thumbnail"
        :src="video.videoUrl"
      />
      <v-btn
        class="m-4"
        color="primary"
        @click="handlePlayPause"
      >
        {{ isPlaying ? 'Pause' : 'Play' }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { createExperience } from '../../plugins/sourcesync'

  const route = useRoute()

  const video = ref({
    id: null,
    title: ``,
    description: '',
    thumbnail: ``,
    videoUrl: '',
  })
  const videoRef = ref<HTMLVideoElement | null>(null)
  const isPlaying = ref(false)

  const handlePlayPause = () => {
    if (videoRef.value) {
      if (isPlaying.value) {
        videoRef.value.pause()
      } else {
        videoRef.value.play()
      }
      isPlaying.value = !isPlaying.value
    }
  }

  let experienceView: any

  onMounted(async () => {
    const id = route.params.id as string
    // In a real app, fetch video details from your backend here
    video.value = {
      id,
      title: `Video ${id}`,
      description: 'Video description',
      thumbnail: `https://picsum.photos/300/200?random=${id}`,
      videoUrl: 'https://storage.googleapis.com/cdn.sourcesync.io/videos/Frecon%20Farms%20Preview_1.mp4',
    }
    const { experience } = await createExperience({
      distribution: { id: '56614' },
      targetEl: videoRef.value,
    })
    experienceView = experience
    experience.init()
  })

  onUnmounted(() => {
    experienceView?.destroy()
  })
</script>
