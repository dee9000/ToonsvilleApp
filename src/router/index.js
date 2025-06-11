// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Favorites from '../pages/Favorites.vue';
import Details from '../pages/Details.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/favorites', component: Favorites },
  { path: '/cartoon/:id', component: Details },
];

//This line says:
//“Hey Vue, I want to create a router. Use clean URLs (no hash signs), and here are the pages I want you to show for each route.”
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
