<script lang="ts" setup>
import svg from "./static/excellent.svg?raw";
</script>

<template>
  <div class="sya-application-score-face--comp">
    <div class="svg" v-html="svg"></div>
    <picture>
      <source srcset="./static/excellent.webp" type="image/webp" />
      <img src="./static/excellent.gif" alt="🤩" />
    </picture>
  </div>
</template>

<style lang="scss">
.sya-application-score-face--comp {
  .svg {
    width: 100%;
    height: 100%;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  > picture {
    display: none;

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  &:hover {
    .svg {
      display: none;
    }

    > picture {
      display: block;
    }
  }
}
</style>
