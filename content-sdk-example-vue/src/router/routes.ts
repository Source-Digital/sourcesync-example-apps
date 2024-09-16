export const routes = [
  { path: '/', component: () => import('../pages/Basic.vue') },
  { title: 'Basic', name: 'basic', path: '/basic', component: () => import('../pages/Basic.vue') },
  { title: 'Sync with Video', name: 'buffered-content', path: '/buffered-content', component: () => import('../pages/BufferedContent.vue') },
]