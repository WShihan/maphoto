<template>
  <div class="main">
    <div class="header-out">
      <Header />
    </div>
    <div class="map-out">
      <Map />
    </div>
    <div class="footer-out">
      <Footer />
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
    return {};
  },
  mounted() {},
  unmounted() {},
  methods: {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang="less">
@media (min-width: 1000px) {
  .main {
    width: 40vw;
    height: 100vh;
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
    height: 100vh;
    margin: 0px auto;
    background: rgb(35, 38, 55);
    .header-out {
      width: 100%;
      height: 4%;
    }
    .map-out {
      width: 100%;
      height: 86%;
    }
    .footer-out {
      width: 100%;
      height: 10%;
    }
  }
}
</style>
