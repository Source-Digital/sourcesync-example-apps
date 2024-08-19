import { initializeApp } from 'sourcesync-sdk/app'
import { createExperience as _createExperience, type CreateExperienceViewOptions } from 'sourcesync-sdk/render-experience-web'
import type { Plugin } from 'vue'

// Initialize the SourceSync app
const app = await initializeApp({
  appKey: import.meta.env.VITE_SOURCESYNC_APP_KEY,
  env: import.meta.env.VITE_SOURCESYNC_MODE,
})

export const createExperience = (options: CreateExperienceViewOptions): ReturnType<typeof _createExperience> => _createExperience(app, options)

// Define the plugin
const sourcesyncPlugin: Plugin = {
  install: () => {
    // The app is already initialized, so we don't need to do anything here
  },
}

export default sourcesyncPlugin
