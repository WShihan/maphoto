<template>
  <div class="looker">
    <div class="looker-inner">
      <img :src="srcs[currentSrcIndex]" />
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
          "https://md-1301600412.cos.ap-nanjing.myqcloud.com/map/lijaing.jpeg",
          "https://md-1301600412.cos.ap-nanjing.myqcloud.com/map/Yn_light_lego.jpeg",
          "https://md-1301600412.cos.ap-nanjing.myqcloud.com/GIS/img/%E6%99%AF%E7%82%B9%E6%99%AF%E5%8C%BAgreen.svg",
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
        this.currentSrcIndex = this.srcs.len - 1;
      }
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang="less">
.looker {
  position: fixed;
  top: 10%;
  left: 2vw;
  width: 96vw;
  min-height: 45%;
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
      width: 90%;
      margin: 5% auto;
    }
  }
  .btn {
    width: 10vw;
    z-index: 999;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .img-handle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 96vw;
    min-height: 4vh;
    padding: 1vw;
    margin: 0vw auto 1vh;
    .tip {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 70%;
      height: 100%;
      .tip-item {
        width: 10px;
        height: 10px;
        margin: 0vw 0.5vw;
        border-radius: 5px;
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
    width: 8vw;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
