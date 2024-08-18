import { initializeApp } from '@sourcesync-sdk/app'
import { createActivationView, useSmartblockRenderer } from '@sourcesync-sdk/render-activation-web'
import type { Plugin } from 'vue'

// Initialize the SourceSync app
const app = await initializeApp({
  appKey: import.meta.env.VITE_SOURCESYNC_APP_KEY,
  env: import.meta.env.VITE_SOURCESYNC_MODE,
})

// Create and export the functions from render-activation-web
export const activationView = (activation: any, options: any) =>
  createActivationView(app, activation, options)

export { useSmartblockRenderer }

// Define the plugin
const sourcesyncPlugin: Plugin = {
  install: () => {
    // The app is already initialized, so we don't need to do anything here
  },
}

export default sourcesyncPlugin
