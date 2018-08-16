<template lang="pug">
  .w-full.max-w-screen-xl.mx-auto.px-6
    .-mx-6(class="lg:flex")
      h1.text-lg Project
</template>

<script>
import http from './../../services/http'
export default {
  name: 'ProjectComponent',
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      http.get('/projects', ({ data }) => {

      })
    }
  }
}
</script>
