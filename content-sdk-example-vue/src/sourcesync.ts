import { initializeApp, SourceSyncApp } from "sourcesync-sdk/app";

/**
 * Initialize the SourceSync app.
 */
export const app: SourceSyncApp = await initializeApp({ 
  appKey: import.meta.env.VITE_SOURCESYNC_APP_KEY, 
  env: import.meta.env.VITE_SOURCESYNC_APP_ENV 
});
