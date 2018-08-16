<template>
  <div id="app">
    <navigator />
    <router-view />
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue'
export default {
  name: 'app',
  components: {
    Navigator
  }
}
</script>

<style src="./assets/css/main.css"></style>
