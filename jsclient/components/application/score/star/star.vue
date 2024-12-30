<script lang="ts" setup>
import star from "./static/star.svg?raw";

defineProps({ fill: { type: String, default: "#00e275" } });
</script>

<template>
  <div
    class="sya-application-score-star---star"
    :style="{ backgroundColor: fill }"
  >
    <div class="svg" v-html="star"></div>
  </div>
</template>

<style lang="scss">
.sya-application-score-star---star {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .svg {
    width: 70%;
    height: 70%;

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: #000;
    }
  }
}
</style>
