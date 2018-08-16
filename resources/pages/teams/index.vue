<template lang="pug">
  .container
    h1.text-lg Project

    ul
      li(v-for="team in teams")
        span {{ team.name }}

</template>

<script>
import http from './../../services/http'
export default {
  name: 'TeamComponent',
  data () {
    return {
      teams: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      http.get('/teams', ({ data }) => {
        this.teams = data.data
      })
    }
  }
}
</script>
