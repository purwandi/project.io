<template lang="pug">
  .p-t-3
    p(v-for="project in projects")
      router-link(:to="{ name: 'projects', params: {teamID: team.UID, projectID: project.UID } }") {{ project.name }}
</template>

<script>
import http from './../../services/http'
export default {
  name: 'ProjectItem',
  data () {
    return {
      projects: []
    }
  },
  props: {
    team: { required: true, type: Object }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      http.get('/teams/' + this.team.UID + '/projects', ({ data }) => {
        this.projects = data.data
      })
    }
  }
}
</script>
