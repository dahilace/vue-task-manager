import { createRouter, createWebHashHistory, type RouteLocation } from 'vue-router'

import ProjectsPage from '@/pages/ProjectsPage.vue'
import ProjectsDetailsPage from '@/pages/ProjectsDetailsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/projects',
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/projects/:id',
      name: 'project-details',
      component: ProjectsDetailsPage,
      props: true,
      meta: {
        title: (route: RouteLocation) => `Vue Project | ${route.params.id}`
      }
    },

    //...
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: {
        title: 'Not Found'
      }
    }
  ],
})

export default router
