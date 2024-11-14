import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from '@/components/PokemonList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PokemonList',
      component: PokemonList,
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonSingle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PokemonDetail.vue'),
    },
  ],
})

export default router
