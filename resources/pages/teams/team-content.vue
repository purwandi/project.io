<template lang="pug">
  .px-6.pt-6
    .grey-light.border-solid.border-b.p-l-2.p-b-2.mb-4
      h1 {{ team.name }}
    project-item(:team="team")
</template>

<script>
export default {
  name: 'TeamContent',
  props: {
    team: {
      required: true,
      type: Object
    }
  },
  components: {
    ProjectItem: () => import(/* webpackChunkName: "team-content" */'./../projects/project-item.vue')
  }
}
</script>
