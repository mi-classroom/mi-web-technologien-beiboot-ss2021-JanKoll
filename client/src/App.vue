<template>
    <Home />
</template>

<script>
import Home from './components/Home.vue'
// import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
// Colors
$midnight: #2c3e50;
$asphalt: #34495e;
$clouds: #ecf0f1;
$emerald: #2ecc71;

* {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: $midnight;
  height: 100vh;
}

#app {
  // text-align: center;
  color: $clouds;
  // margin-top: 60px;
}
</style>
