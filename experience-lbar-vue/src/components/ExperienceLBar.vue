<script setup lang="ts">
import { ComponentInstance, computed, onMounted, ref, StyleValue, defineProps } from 'vue';
import { createExperience, GridTargetConfig, modeCfg } from 'sourcesync-sdk/render-experience-web';
import { app } from '../sourcesync';
import { buildActivation } from 'sourcesync-sdk/render-activation-web';
import { createActivation } from '../utils/activation';
import { create } from 'lodash';

defineSlots<{
  default(props: {
    setMediaElRef: (element?: Element | ComponentInstance<any>) => void
    mediaElStyle: { [key: string]: string }
  }): any
}>()

const props = withDefaults(defineProps<{
  pinch?: boolean
  rightWidth?: string
  bottomHeight?: string
}>(), {
  pinch: false,
  rightWidth: '25%',
  bottomHeight: '25%'
})

const rootElRef = ref<Element | null>(null);
const mediaElRef = ref<Element | ComponentInstance<any> | null>(null);

const rootStyle = computed(() => ({
  gridTemplateColumns: `1fr ${props.rightWidth}`,
  gridTemplateRows: `1fr ${props.bottomHeight}`
}))

onMounted(async () => {
  const rootEl = rootElRef.value;
  if (!rootEl) { return; }
  const { experience } = await createExperience(app, {
    targetEl: mediaElRef.value as HTMLElement,
    distribution: {
      id: '56621'
    }
  })
  experience.addOverlayTarget(
    modeCfg<GridTargetConfig>().default({
      grid: {
        area: [[ 'left', 'right' ]]
      }
    }).build(), 
    {}
  );

  experience.addCustomTarget(
    'ext-right',
    modeCfg().default({ type: 'list' }).build(), 
    {
      mount: {
        type: 'overlay',
        referenceEl: rootEl.querySelector('.experience-lbar__right') as HTMLElement
      }
    }
  );

  experience.addCustomTarget(
    'ext-bottom',
    modeCfg().default({ type: 'list' }).build(), 
    {
      mount: {
        type: 'insert',
        options: {
          el: rootEl.querySelector('.experience-lbar__bottom') as HTMLElement,
          insertionMode: 'appendChild'
        }
      }
    }
  );

  // Add an example activations
  experience.pushItems([
  createActivation({
    id: 'ext-right-1',
    label: 'External Right',
    instance: {
      when: {
        start: 0,
        end: 8000
      },
      position: 'ext-right'
    }
  }),
  createActivation({
    id: 'ext-bottom-1',
    label: 'External Bottom',
    templateType: 'action',
    instance: {
      when: {
        start: 0,
        end: 8000
      },
      position: 'ext-bottom'
    },
  }),
  createActivation({
    id: 'ext-bottom-2',
    label: 'External Bottom 2',
    templateType: 'action',
    instance: {
      when: {
        start: 1000,
        end: 9000
      },
      position: 'ext-bottom'
    }
  })
  ])

  experience.init()
})

</script>
<template>
  <div ref="rootElRef" class="experience-lbar" :style="rootStyle">
    <div class="experience-lbar__main">
      <video
        ref="mediaElRef"
        controls
      >
        <source src="//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="experience-lbar__right"></div>
    <div class="experience-lbar__bottom"></div>
  </div>
</template>

<style scoped>
.experience-lbar {
  display: grid;
  grid-template-columns: 1fr 25%;
  grid-template-rows: 1fr 25%;
  grid-template-areas: "main right" "bottom bottom";
  width: 100%;
}

.experience-lbar__right {
  grid-area: right;
  background-color: rgba(125, 125, 125, 0.2);
}

.experience-lbar__main {
  aspect-ratio: 16 / 9;
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
}

.experience-lbar__main video {
  width: 100%;
  object-fit: contain;
}

.experience-lbar__bottom {
  grid-area: bottom;
  background-color: rgba(125, 125, 125, 0.2);
}

</style>