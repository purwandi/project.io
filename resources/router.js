import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'home', component: () => import(/* webpackChunkName: "dashboard" */ './pages/dashboard/index.vue') },
    { path: '/teams', name: 'teams', component: () => import(/* webpackChunkName: "teams" */ './pages/teams/index.vue') },
    { path: '/teams/:teamID/projects/:projectID', name: 'projects', component: () => import(/* webpackChunkName: "projects" */ './pages/projects/project-dashboard.vue') }
  ]
})


export default router
