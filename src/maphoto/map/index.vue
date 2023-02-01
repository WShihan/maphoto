<template>
  <div style="width: 100%; height: 100%">
    <div id="map-container"></div>
    <Transition>
      <Looker v-if="popup.open" :srcs="popup.srcs" @close="popup.open = false" />
    </Transition>
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#map-container {
  width: 100%;
  height: 100%;
}
</style>
