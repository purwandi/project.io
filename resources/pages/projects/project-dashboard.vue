<template lang="pug">
  .px-6.pt-6
    .mb-6
      h4 Sprint 1
      p.text-sm.mb-2 Start 2 Aug 2018 - 16 Aug 2018
      ul.issues.list-reset
        li.flex.items-center.justify-between.flex-wrap.p-2.block.border-grey-light.border-solid.border(v-for="issue in issues")
          span.flex.items-center.flex-no-shrink.mr-2.ml-1
            icon-book.text-teal-dark
          span.w-full.block.flex-grow(class="lg:flex lg:items-center lg:w-auto") {{ issue.title }}
    .mb-6
      h4 Sprint 2
      p.text-sm.mb-2
      ul.issues.list-reset
        li.flex.items-center.justify-between.flex-wrap.p-2.block.border-grey-light.border-solid.border(v-for="issue in issues")
          span.flex.items-center.flex-no-shrink.mr-2.ml-1
            icon-book.text-teal-dark
          span.w-full.block.flex-grow(class="lg:flex lg:items-center lg:w-auto") {{ issue.title }}
    .mb-6
      .float-right
        button.bg-blue.rounded.text-white.py-2.px-4  Create sprint
      h4 Backlog
      p.text-sm.mb-2 Start 2 Aug 2018 - 16 Aug 2018
      ul.issues.list-reset
        li.flex.items-center.justify-between.flex-wrap.p-2.block.border-grey-light.border-solid.border(v-for="issue in issues")
          span.flex.items-center.flex-no-shrink.mr-2.ml-1
            icon-book.text-teal-dark
          span.w-full.block.flex-grow(class="lg:flex lg:items-center lg:w-auto") {{ issue.title }}

</template>

<script>
import http from './../../services/http'
export default {
  name: 'ProjectDashboard',
  data () {
    return {
      project: {},
      issues: []
    }
  },
  components: {
    IconBook: ()=> import('icons/book.vue')
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

<style lang="scss">
ul.issues {
  li {
    border-bottom: none;
  }
  li:last-child {
    border-bottom: 1px solid #dae1e7;
  }
}
</style>
