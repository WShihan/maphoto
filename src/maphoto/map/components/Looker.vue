<template>
  <div class="looker">
    <div class="header">
      <div class="date">
        <span>{{ srcs[currentSrcIndex].date }}</span>
      </div>
      <div class="close btn" @click="this.$emit('close')">
        <span class="icon">⌫</span>
      </div>
    </div>
    <div class="looker-inner">
      <img v-for="(src, i) in srcs" :key="i" :src="src.src" v-show="currentSrcIndex === i" />
    </div>
    <div class="img-handle">
      <div class="btn left" @click="backwardLook">
        <span class="icon">◀</span>
      </div>
      <div class="tip">
        <div
          :class="['tip-item', k === currentSrcIndex ? 'active' : '']"
          v-for="(item, k) in srcs"
          :key="k.src"
        ></div>
      </div>
      <div class="btn right" @click="towardLook">
        <span class="icon">▶</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Looker',
  props: {
    srcs: {
      type: Array,
      default: () => {
        return [
          {
            date: '2024-01-01',
            src: 'https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/image-20220328152305216.png',
          },
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
};
</script>

<style scoped lang="less">
@--btn-size: 0.8rem;
@--btn-color: rgb(18, 150, 219);
.looker {
  display: flex;
  z-index: 1000;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: #fff;
  .looker-inner {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2vw;
    img {
      flex: 1;
      display: block;
      width: 100%;
      margin: 0 auto;
      border-radius: 0.5vw;
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
    .icon {
      font-size: 8vw;
      color: @--btn-color;
      &:hover {
        color: gray;
      }
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
  .header {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 1vw;
    left: 0vw;
    width: 100vw;
    .date {
      width: 100%;
      font-weight: bold;
    }
    .close {
      position: absolute;
      right: 6vw;
      width: 2vw;
      cursor: pointer;
    }
  }
}
</style>
