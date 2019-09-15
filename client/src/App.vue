<template>
  <div id="app">
    <navigator></navigator>
  </div>
</template>

<script>
import Navigator from '@/components/Navigator'

export default {
  components: {
    Navigator
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
