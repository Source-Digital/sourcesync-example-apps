<script setup lang="ts">
/**
 * This example demonstrates how to get the context of a video at a specific time as the video plays.
 * See BufferedContentVideo.vue for the Content SDK usage.
 */
import { Context } from 'sourcesync-sdk/moment';
import BufferedContentVideo from '../components/BufferedContentVideo.vue'
import VueJsonPretty from 'vue-json-pretty';
import { ref } from 'vue';
import { JSONDataType } from 'vue-json-pretty/types/utils';
const videoUrl = ref('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4?v1')
const videoUrlInput = ref(videoUrl.value)
const currentContext = ref<Context | null>(null)

function onContextUpdate(context: Context) {
  currentContext.value = context
}

const onVideoUrlSubmit = () => {
  videoUrl.value = videoUrlInput.value
  currentContext.value = null
}

</script>

<template>
  <div class="page-buffered-content">
    <article class="section-video">
        <section style="display: flex; justify-content: center">
          <BufferedContentVideo class="content-video" :src="videoUrl" controls @update:context="onContextUpdate"/>
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
    <div class="section-editor grid">
      <div>
        <article class="current-context-json">
          <h6>Current Context</h6>
          <p>
            <small><i>Play the video and the context will be updated every 2 seconds.</i></small>
          </p>
         
          <VueJsonPretty tty :data="(currentContext as JSONDataType)"></VueJsonPretty>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-buffered-content {
  height: 100%;
}
.video-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
