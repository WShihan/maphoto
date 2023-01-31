<template>
  <div class="footer">
    <div class="btns">
      <img src="@/assets/icon/locate.png" alt="" />
      <img src="@/assets/icon/about.png" alt="" />
    </div>
    <div class="home-btn">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {},
  components: {},
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
.footer {
  width: 100%;
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5vw;
    img {
      width: 7vw;
    }
  }
  .home-btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 1%;
    left: 0%;
    .inner {
      width: 35%;
      height: 1vw;
      border-radius: 0.5vw;
      background: #fff;
    }
  }
}
</style>
