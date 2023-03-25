<template>
  <div class="looker">
    <div class="looker-inner">
      <img v-for="(src, k) in srcs" :key="k" :src="src" v-show="currentSrcIndex === k" />
    </div>
    <div class="btn close" @click="this.$emit('close')">
      <i class="icon iconfont icon-close"></i>
    </div>
    <div class="img-handle">
      <div class="btn left" @click="backwardLook">
        <i class="icon iconfont icon-left"></i>
      </div>
      <div class="tip">
        <div
          :class="['tip-item', k === currentSrcIndex ? 'active' : '']"
          :title="k"
          v-for="(item, k) in srcs"
          :key="k"
        ></div>
      </div>
      <div class="btn right" @click="towardLook">
        <i class="icon iconfont icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Looker",
  props: {
    srcs: {
      type: Array,
      default: () => {
        return [
          "https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/image-20220328152305216.png",
        ];
      },
    },
  },
  data() {
    return {
      currentSrcIndex: 0,
    };
  },
  methods: {
    towardLook() {
      if (this.currentSrcIndex < this.srcs.length - 1) {
        this.currentSrcIndex += 1;
      } else {
        this.currentSrcIndex = 0;
      }
    },
    backwardLook() {
      if (this.currentSrcIndex > 0) {
        this.currentSrcIndex -= 1;
      } else {
        this.currentSrcIndex = this.srcs.length - 1;
      }
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang="less">
@--btn-size: 0.8rem;
@--btn-color: rgb(18, 150, 219);
.looker {
  z-index: 1000;
  position: absolute;
  width: 100vw;
  top: 6vh;
  min-height: 25%;
  padding: 0.5vw 0vw;
  margin: 0 auto;
  border-radius: 1vw;
  background: rgba(35, 38, 55, 0.932);
  .looker-inner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    img {
      width: 99%;
      margin: 0 auto;
    }
  }
  .btn {
    width: 6vw;
    z-index: 999;
    padding: 1vw;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    i {
      color: @--btn-color;
      font-size: @--btn-size;
    }
  }
  .img-handle {
    position: absolute;
    left: 0%;
    bottom: 0%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: inherit;
    margin: 2vh auto 0.5vh;
    .tip {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 60%;
      height: 100%;
      .tip-item {
        width: 2vw;
        height: 2vw;
        margin: 0vw 0.5vw;
        border-radius: 1vw;
        background: rgb(238, 238, 239);
        &.active {
          background: @--btn-color;
        }
      }
    }
  }
  .close {
    position: absolute;
    top: 80%;
    top: 1vw;
    right: 2vw;
    width: 6vw;
    cursor: pointer;
    i {
      color: @--btn-color;
      font-size: @--btn-size;
    }
  }
}
</style>
