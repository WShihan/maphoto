<template>
  <div class="header">
    <div class="navs">
      <Navigation :btn-width="'80px'" />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Header",
  props: {},
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
}
.header {
  width: 100%;
  height: 100%;
}
</style>
