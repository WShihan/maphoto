<template>
  <div class="header">
    <div class="icon" v-if="changeUI" @click="this.$emit('change')">
      <span>完成</span>
    </div>
    <div class="navs" v-else>
      <Navigation :btn-width="'80px'" @change="true" />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Header",
  props: {
    changeUI: {
      type: Boolean,
      default: false,
    },
  },
  components: { Navigation },
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
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: inherit;
  .icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 10vw;
    position: absolute;
    right: 6vw;
    cursor: pointer;
    span {
      font-size: 4vw;
      color: rgb(18, 150, 219);
      font-weight: bold;
    }
  }
}
</style>
