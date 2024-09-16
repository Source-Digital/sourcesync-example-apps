export const routes = [
  { path: '/', component: () => import('../pages/PageBasic.vue') },
  { title: 'Basic', name: 'basic', path: '/basic', component: () => import('../pages/PageBasic.vue') }
]