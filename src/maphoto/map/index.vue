<template>
  <div style="width: 100%; height: 100%">
    <Loading v-show="loading" top="1.5vw" right="2vw" />
    <div id="map-container"></div>
    <Transition>
      <Looker v-if="popup.open" :srcs="popup.srcs" @close="popup.open = false" />
    </Transition>
  </div>
</template>

<script>
import { initialMap } from "./index.js";
import Looker from "./components/Looker.vue";
import { getMapInitialConfig } from "@/apis";
import Loading from "@/components/Loading.vue";

export default {
  name: "Map",
  props: {},
  data() {
    return {};
  },
  components: { Looker, Loading },
  setup() {
    return initialMap();
  },
  mounted() {
    const name = this.$route.params.name === "" ? "wsh" : this.$route.params.name;
    getMapInitialConfig({ name: name }).then((response) => {
      this.mapConfig = response.data.data.config;
      document.title = this.mapConfig.title;
      this.createMap();
      this.loadPhoto(response.data.data.features);
    });
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
