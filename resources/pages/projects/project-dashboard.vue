<template lang="pug">
  .px-6.pt-6
    .mb-5
      .text-sm.block.border-grey-light.border-solid.border(v-for="issue in issues")
        span {{ issue.title }}

</template>

<script>
import http from './../../services/http'
export default {
  name: 'ProjectDashboard',
  data () {
    return {
      issues: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      http.get('teams/' + this.$route.params.teamID + '/projects/' + this.$route.params.projectID + '/issues', ({ data }) => {
        this.issues = data.data
      })
    }
  }
}
</script>
