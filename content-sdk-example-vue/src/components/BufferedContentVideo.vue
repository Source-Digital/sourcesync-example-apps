<script setup lang="ts">
/**
 * This video component takes a video URL, renders it, and emits the context of the video at a specific time.
 */
import { BufferedContent, getContent } from 'sourcesync-sdk/content';
import { onMounted, ref, watch } from 'vue';
import { app } from '../sourcesync'
import { Context } from 'sourcesync-sdk/moment';
import { throttle } from 'lodash';
const props = withDefaults(defineProps<{
  src: string
  momentDuration?: number
  momentBufferDuration?: number
  throttleDuration?: number
}>(), {
  momentDuration: 2000,
  momentBufferDuration: 6000,
  throttleDuration: 1000
})

const emit = defineEmits<{
  (event: 'update:context', context: Context): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
let bufferedContent: BufferedContent | null = null

watch(() => props.src, async () => {
  videoRef.value?.load()
  const content = await getContent({ app, environment: {}, mediaUrl: props.src })
  bufferedContent = content.buffered({ duration: props.momentDuration, bufferDuration: props.momentBufferDuration})
  
}, { immediate: true })

onMounted(() => {
  videoRef.value?.addEventListener('timeupdate', throttle((e) => {
    const currentTime = videoRef.value?.currentTime ?? 0
    bufferedContent?.getContext(currentTime * 1000)
      .then((context) => {
        emit('update:context', context)
      })    
  }, props.throttleDuration))
})
</script>

<template>
  <video ref="videoRef">
    <source :src="src" type="video/mp4">
  </video>
</template>

<style scoped>

</style>
