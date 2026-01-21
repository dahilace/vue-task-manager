import { createRouter, createWebHistory } from 'vue-router'

import ProjectsPage from '@/pages/ProjectsPage.vue'
import ProjectsDetailsPage from '@/pages/ProjectsDetailsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/projects'
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage
    },
    {
      path: '/projects/:id',
      name: 'project-details',
      component: ProjectsDetailsPage,
      props: true
    },

    //...
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ],
})

export default router
