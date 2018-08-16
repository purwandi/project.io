<template lang="pug">
  nav.flex.items-center.justify-between.flex-wrap.bg-white.p-4.border-grey-light.border-solid.border-b
    .flex.items-center.flex-no-shrink.text-white.mr-6
      .font-semibold
        router-link.no-underline.text-grey(class="lg:inline-block lg:mt-0 hover:text-grey-darker" :to="'/'") HH
    .w-full.block.flex-grow(class="lg:flex lg:items-center lg:w-auto")
      .text-sm(class="lg:flex-grow:")
        router-link.block.mt-4.font-semibold.no-underline.mr-4.text-grey(class="lg:inline-block lg:mt-0 hover:text-grey-darker" :to="'teams'") Teams
      div
        a.inline-block.no-underline.text-sm.text-grey.px-4.py-2.leading-none.text-white.border-white.mt-4(class="hover:border-transparent hover:text-grey-darker lg:mt-0")
</template>

<script>
export default {
  name: 'Navigator'
}
</script>
