
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: () => import("@/pages/PageHome.vue")
  },{
    path: '/topic-detail',
    name: 'topic-detail',
    component: () => import("@/pages/PageTopics.vue")
  },{
    path: '/store-detail',
    name: 'store-detail',
    component: () => import("@/pages/PageStores.vue")
  },{
    path: "/:catchAll(.*)",
    component: () => import("@/layout/NotFouLayout.vue")
  }]
});

export default router;
