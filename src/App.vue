<template>
  <Maphoto />
</template>

<script>
import Maphoto from "./maphoto/index.vue";
export default {
  name: "App",
  components: { Maphoto },
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
body {
  width: 100vw;
  height: 100%;
}
#app {
  width: inherit;
  height: inherit;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
