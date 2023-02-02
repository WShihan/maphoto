<template>
  <div class="navs" :style="navWrapperStyle">
    <div
      v-for="(item, key) in navs"
      :key="key"
      :class="['nav-item', item.name === active ? 'active' : '']"
      @click="choose(item)"
      :style="navBtnStyle"
    >
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    btnWidth: {
      type: String,
      default: () => {
        return "";
      },
    },
    btnHeight: {
      type: String,
      default: () => {
        return "";
      },
    },
    defaultActiveIndex: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    navs: {
      type: Array,
      default: () => {
        return [
          { name: "map", title: "地图" },
          { name: "grid", title: "网格" },
        ];
      },
    },
  },
  components: {},
  data() {
    return {
      active: this.navs[this.defaultActiveIndex].name,
    };
  },
  mounted() {},
  unmounted() {},
  methods: {
    choose(nav) {
      this.active = nav.name;
      this.$emit("change", nav);
    },
  },
  watch: {},
  computed: {
    navBtnStyle() {
      return {
        width: this.btnWidth === "" ? 100 / this.navs.length + "%" : this.btnWidth,
        height: this.btnHeight === "" ? "100%" + "%" : this.btnHeight,
      };
    },
    navWrapperStyle() {
      let width;
      if (this.btnWidth != "") {
        width = this.navs.length * Number(this.btnWidth) + 2;
      }
      return {
        width: width + "px",
      };
    },
  },
};
</script>

<style scoped lang="less">
.navs,
.nav-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.navs {
  border-radius: 1.5vw;
  background: rgb(52, 67, 107);

  .nav-item {
    text-align: center;
    color: #fff;
    padding: 1vw;
    border-radius: 1vw;
    cursor: pointer;
    &.active {
      background: rgb(110, 113, 130);
    }
  }
}
</style>
