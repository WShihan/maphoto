<template>
  <div class="looker">
    <div class="looker-inner">
      <img v-for="(src, k) in srcs" :key="k" :src="src" v-show="currentSrcIndex === k" />
    </div>
    <div class="btn close" @click="this.$emit('close')">
      <img src="@/assets/icon/close.svg" alt="" />
    </div>
    <div class="img-handle">
      <div class="btn left" @click="backwardLook">
        <img src="@/assets/icon/left.svg" alt="" />
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
        <img src="@/assets/icon/right.svg" alt="" />
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
.looker {
  position: absolute;
  width: 80vw;
  top: 6vh;
  left: 10vw;
  min-height: 25%;
  padding: 2vw 0vw;
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
      width: 98%;
      margin: 0 auto;
    }
  }
  .btn {
    width: 6vw;
    z-index: 999;
    padding: 1vw;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .img-handle {
    position: relative;
    left: 0%;
    bottom: 0%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: inherit;
    min-height: 2vh;
    padding: 0 1vw;
    margin: 2vh auto 0.5vh;
    .tip {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 65%;
      height: 100%;
      .tip-item {
        width: 2vw;
        height: 2vw;
        margin: 0vw 0.5vw;
        border-radius: 1vw;
        background: rgb(77, 93, 153);
        &.active {
          background: rgb(6, 126, 247);
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
    img {
      width: 100%;
    }
  }
}
</style>
