# Netflix Clone Example App

This repository contains a Netflix-style video streaming application built with Vue 3, Vuetify, and the SourceSync SDK. It serves as a practical example of how to integrate SourceSync's interactive video capabilities into a modern web application.

## Tutorial

This example app is based on the tutorial available in the SourceSync documentation:

[Netflix Clone Vuetify Tutorial](https://docs.sourcesync.io/docs/category/tutorials/netflix-clone-vuetify-tutorial)

We recommend following the tutorial for a step-by-step guide on how this application was built and how to integrate SourceSync into your own projects.

## Features

- Video grid homepage
- Video details page
- Video player with SourceSync integration for interactive overlays
- Responsive design using Vuetify components

## Technologies Used

- Vue 3
- Vuetify
- SourceSync SDK
- TypeScript
- Vite

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or later)
- npm or yarn
- A SourceSync account and API key

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/netflix-clone-example.git
   cd netflix-clone-example
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your SourceSync API key:
   ```
   VITE_SOURCESYNC_APP_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

To build the app for production, run:

```
npm run build
```

This will generate a `dist` folder with the compiled assets.

## Learn More

To learn more about SourceSync and how to use it in your projects, visit the [SourceSync Documentation](https://docs.sourcesync.io/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.