<template lang="pug">
  nav.px-6.pt-6.overflow-y-auto.text-base
    .mb-8
      p.mb-3.text-grey.uppercase.tracking-wide.font-bold.text-sm.pl-2(class="lg:text-xs lg:mb-2") Workspace
      ul.list-reset
        li(v-for="team in teams")
          a.no-underline.text-grey.block.pt-1.pb-1.pl-2.text-sm(class="hover:bg-grey-lighter hover:text-black" href="#" @click.prevent="changeTeam(team)") {{ team.name }}
      ul.list-reset
        li
          a.no-underline.text-grey.block.pt-1.pb-1.pl-1.text-sm(class="hover:bg-grey-lighter hover:text-black" href="")
            icon-plus
            span.pl-1 Add workspace
</template>

<script>
export default {
  name: 'TeamSidebar',
  props: {
    teams: {
      required: true,
      type: Array
    }
  },
  components: {
    IconPlus: () => import('icons/plus-circle-outline.vue')
  },
  methods: {
    changeTeam (team) {
      this.$emit('team-changed', team)
    }
  }
}
</script>
