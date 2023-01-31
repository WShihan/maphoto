<template>
  <div style="width: 100%; height: 100%">
    <div id="map-container"></div>
    <Looker v-if="popup.open" @close="popup.open = false" />
  </div>
</template>

<script>
import { initialMap } from "./index.js";
import Looker from "./components/Looker.vue";

export default {
  name: "Map",
  props: {},
  data() {
    return {};
  },
  components: { Looker },
  mounted() {
    this.createMap();
    this.loadPhoto();
  },
  setup() {
    return initialMap();
  },
};
</script>

<style scoped lang="less">
#map-container {
  width: 100%;
  height: 100%;
}
</style>
