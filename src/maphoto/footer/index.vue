<template>
  <div class="footer">
    <span class="foot-btn credit">maphoto</span>
    <span class="foot-btn create">创建</span>
    <Navigation v-show="mapControl" :navs="navs" @change="change" btnHeight="25px" />
    <div class="btns" v-if="!mapControl">
      <img src="@/assets/icon/locate.png" alt="" @click="locate" />
      <img src="@/assets/icon/layer.png" alt="" @click="this.$emit('rightClick')" />
    </div>
    <div class="home-btn">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { layerChange, layerAdd, layerAddPhoto } from "@/utils/layerManager";
import { locateHere, generateStyleImg } from "@/utils/tool";
export default {
  name: "Footer",
  props: {
    mapControl: {
      type: Boolean,
      default: false,
    },
  },
  components: { Navigation },
  data() {
    return {
      navs: [
        { name: "street", title: "街区" },
        { name: "mix", title: "混合" },
        { name: "satellite", title: "卫星" },
      ],
    };
  },
  mounted() {},
  unmounted() {},
  methods: {
    change(nav) {
      layerChange(nav.name);
    },
    locate() {
      locateHere();
      // generateStyleImg();
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang="less">
@--textColor: rgb(18, 150, 219);
.footer {
  width: 100%;
  padding-top: 2vw;
  position: absolute;
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 3vw 5vw;
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
  .foot-btn {
    position: absolute;
    top: -20px;
    color: @--textColor;
    font-size: 0.4rem;
  }
  & span.create {
    right: 10px;
  }
  & span.credit {
    left: 10px;
  }
}
</style>
