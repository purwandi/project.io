<template lang="pug">
  .w-full.container.mx-auto.px-6
    .-mx-6(class="lg:flex")
      .hidden.absolute.z-90.top-16.bg-white.w-full.border-b.-mb-16(class="lg:-mb-0 lg:static lg:bg-transparent lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 ")
        div(class="lg:block lg:relative lg:sticky lg:top-16")
          team-sidebar(:teams="teams" v-on:team-changed="changeTeam")
      .min-h-screen.w-full(class="lg:static lg:max-h-full lg:overflow-visible lg:w-3/4")
        team-content(:teams="teams" :team="team" v-if="loading === false")
</template>


<script>
import http from './../../services/http'
export default {
  name: 'TeamDashboard',
  data () {
    return {
      loading: true,
      teams: [],
      team: {}
    }
  },
  components: {
    TeamSidebar: () => import(/* webpackChunkName: "team-sidebar" */'./team-sidebar.vue'),
    TeamContent: () => import(/* webpackChunkName: "team-content" */'./team-content.vue')
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      http.get('/teams', ({ data }) => {
        this.teams = data.data
        this.team = data.data[0]
        this.loading = false
      })
    },
    changeTeam (team) {
      // eslint-disable-next-line
      console.log(team)
      this.team = team
    }
  }
}
</script>
