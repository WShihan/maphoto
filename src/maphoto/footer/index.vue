<template>
  <div class="footer">
    <div class="btns">
      <img src="@/assets/icon/locate.png" alt="" />
      <img src="@/assets/icon/about.png" alt="" />
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
  setup() {},
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
    padding: 20px;
    img {
      width: 20px;
    }
  }
}
</style>
