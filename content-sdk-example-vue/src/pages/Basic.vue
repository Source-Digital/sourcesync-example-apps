<script setup lang="ts">
/**
 * This example demonstrates how to get the context of a video at a specific time.
 */
import { Context } from 'sourcesync-sdk/moment';
import VueJsonPretty from 'vue-json-pretty';
import { ref, watch } from 'vue';
import { JSONDataType } from 'vue-json-pretty/types/utils';
import { Content, getContent } from 'sourcesync-sdk/content';
import { app } from '../sourcesync'
const videoUrl = ref('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4?v1')
const videoUrlInput = ref(videoUrl.value)
const currentContext = ref<Context | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const query = ref<{ start: number, duration: number }>({ start: 0, duration: 5000})
let content: Content | null = null

watch(() => videoUrl.value, async () => {
  videoRef.value?.load()
  currentContext.value = null
  content = await getContent({ app, environment: {}, mediaUrl: videoUrl.value })
}, { immediate: true})

function onVideoUrlSubmit () {
  videoUrl.value = videoUrlInput.value
}

function getContext() {
  if (!content) return
  const { start, duration } = query.value
  if (start == null || duration == null) return
  /**
   * Get the context of the video at the given start and duration
   */
  content.getContext({ start, duration })
    .then((context) => {
      currentContext.value = context
    })
}

function toFixed(value: number, digits: number = 3): number {
  return Number.parseFloat(value.toFixed(digits))
}

</script>

<template>
  <div class="page-content">
    <article class="section-video">
        <section style="display: flex; justify-content: center">
          <video ref="videoRef" class="video-wrapper" :src="videoUrl" controls ></video>
        </section>
        <section>
          <section class="form-group">
            <label>Video URL</label>
            <fieldset role="group">
              <input id="video-url" v-model="videoUrlInput" />
              <button @click="onVideoUrlSubmit">Update</button>
            </fieldset>
          </section>
        </section>
    </article>
    <article>
      <h6>Request Context</h6>
      <div class="form-group">
        <label>Start (msec)</label>

        <input type="number" v-model="query.start" />
        <button style="width: 300px;" class="secondary" @click="query.start = toFixed(videoRef?.currentTime ?? 0) * 1000">Get video's current time</button>
      </div>
      <div class="form-group">
        <label>Duration (msec)</label>
        <input type="number" v-model="query.duration" />
      </div>
      <div style="display: flex; justify-content: end;">
        <button @click="getContext">Get Context</button>
      </div>
    </article>
    <div class="section-editor grid">
      <div>
        <article class="current-context-json">
          <h6>Context Response</h6>
          <VueJsonPretty tty :data="(currentContext as JSONDataType)"></VueJsonPretty>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-content {
  height: 100%;
}
.video-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
