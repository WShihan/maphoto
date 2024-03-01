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
import { initialMap } from './index.js';
import Looker from './components/Looker.vue';
import { getMapInitialConfig } from '@/apis';
import Loading from '@/components/Loading.vue';
import { Notify } from '@/utils/notify';

export default {
  name: 'Map',
  props: {},
  data() {
    return {};
  },
  components: { Looker, Loading },
  setup() {
    return initialMap();
  },
  mounted() {
    let name = this.$route.params.name;
    name = name == '' ? 'wsh' : name;
    this.createMap();
    getMapInitialConfig({ name: name })
      .then(res => {
        if (res.data.status) {
          Object.assign(this.mapConfig, res.data.data.config);
          this.loadPhoto(res.data.data.features);
        } else throw res.data.msg;
      })
      .catch(err => {
        Notify.warning(err);
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
