<template>
  <div v-if="video">
    <div class="position-relative">
      <video
        ref="videoRef"
        class="w-100"
        :poster="video.thumbnail"
        :src="video.videoUrl"
      />
      <div
        ref="overlayRef"
        class="position-absolute top-0 start-0 w-100 h-100"
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
  import { activationView, useSmartblockRenderer } from '../../plugins/sourcesync'

  const route = useRoute()

  const video = ref({
    id: null,
    title: ``,
    description: '',
    thumbnail: ``,
    videoUrl: '',
  })
  const videoRef = ref<HTMLVideoElement | null>(null)
  const overlayRef = ref<HTMLDivElement | null>(null)
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

    if (videoRef.value && overlayRef.value) {
      const view = activationView(
        { distribution: { id: '56614' } },
        {
          el: overlayRef.value,
          renderer: useSmartblockRenderer({}),
        }
      )

      view.mount()

      onUnmounted(() => {
        view.unmount()
      })
    }
  })
</script>
