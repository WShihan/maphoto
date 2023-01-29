<template>
  <div id="map-container"></div>
</template>

<script>
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
export default {
  name: "Map",
  props: {},
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  unmounted() {},
  methods: {
    initMap() {
      const tk = "bdbf8bbd2d00a2731397dca87a489db0";
      var map = new Map({
        target: "map-container",
        layers: [
          new Tile({
            title: "天地图矢量图层",
            source: new XYZ({
              url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" + tk,
              wrapX: false,
            }),
          }),
          new Tile({
            title: "天地图矢量注记图层",
            source: new XYZ({
              url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" + tk,
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([118, 39]),
          zoom: 6,
        }),
        controls: [],
      });
      window.map = map;
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang="less">
#map-container {
  width: 100%;
  height: 100%;
}
</style>
