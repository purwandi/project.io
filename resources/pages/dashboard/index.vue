<template lang="pug">
  div
    team-dashboard
</template>

<script>
export default {
  name: 'Dashboard',
  components: {
    TeamDashboard: () => import(/* webpackChunkName: "team-dashboard" */'./../teams/team-dashboard.vue')
  }
}
</script>
