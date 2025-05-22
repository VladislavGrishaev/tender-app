import { createRouter, createWebHistory } from 'vue-router';
//@ts-ignore
import TendersPage from '@/views/TendersPage.vue';
//@ts-ignore
import TenderDetailPage from '@/views/TenderDetailPage.vue';

const routes = [
  {
    path: '/',
    name: 'TendersPage',
    component: TendersPage,
  },
  {
    path: '/tender/:id',
    name: 'TenderDetailPage',
    component: TenderDetailPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
