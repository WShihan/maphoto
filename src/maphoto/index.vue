<template>
  <div class="main" :style="mainStyle">
    <div class="header-out">
      <Header :changeUI="mapControl" @change="mapControl = false" />
    </div>

    <div class="map-out">
      <Map />
    </div>
    <div class="footer-out">
      <Footer :map-control="mapControl" @rightClick="mapControl = true" />
    </div>
  </div>
</template>

<script>
import Header from "./header/header.vue";
import Footer from "./footer/index.vue";
import Map from "./map/index.vue";
export default {
  name: "Maphoto",
  props: {},
  components: { Header, Footer, Map },
  data() {
    return {
      screenHeight: 0,
      photoPopupVisible: false,
      mapControl: false,
    };
  },
  beforeMount() {},
  mounted() {
    this.screenHeight = window.innerHeight;
  },
  unmounted() {},
  computed: {
    mainStyle() {
      return {
        width: "100vw",
        height: this.screenHeight + "px",
      };
    },
  },
};
</script>

<style scoped lang="less">
@media (min-width: 1000px) {
  .main {
    width: 40vw;
    margin: 0px auto;
    background: rgb(35, 38, 55);
    .header-out {
      width: 100%;
      height: 5%;
    }
    .map-out {
      width: 100%;
      height: 85%;
    }
    .footer-out {
      width: 100%;
      height: 10%;
    }
  }
}
@media (min-width: 0rem) and (max-width: 1000px) {
  .main {
    width: 100vw;
    margin: 0px auto;
    background: rgb(35, 38, 55);
    .header-out {
      width: 100%;
      height: 5%;
    }
    .map-out {
      width: 100%;
      height: 85%;
    }
    .footer-out {
      width: 100%;
      height: 10%;
    }
  }
}
</style>
