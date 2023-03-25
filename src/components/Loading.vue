<template>
  <div class="loading" :style="style"></div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    size: {
      type: String,
      default: "4vw",
    },
    position: {
      type: String,
      default: "fixed",
    },
    top: {
      type: String,
      default: "50vh",
    },
    bottom: {
      type: String,
      default: null,
    },
    left: {
      type: String,
      default: "50vw",
    },
    right: {
      type: String,
      default: null,
    },
    duration: {
      type: String,
      default: "1s",
    },
  },
  computed: {
    style() {
      let baseCss = {
        width: this.size,
        height: this.size,
        "animation-duration": this.duration,
      };
      if (this.bottom) {
        Object.assign(baseCss, {
          bottom: this.bottom,
        });
      } else {
        Object.assign(baseCss, {
          top: this.top,
        });
      }
      if (this.right) {
        Object.assign(baseCss, {
          right: this.right,
        });
      } else {
        Object.assign(baseCss, {
          left: this.left,
        });
      }
      return baseCss;
    },
  },
};
</script>

<style scoped lang="less">
.loading {
  position: absolute;
  border: 1vw solid #e0e0e0;
  border-top-color: #42a5f5;
  border-radius: 50%;
  z-index: 999;
  animation: animation 1s linear infinite;
}
@keyframes animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
