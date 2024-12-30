<script lang="ts" setup>
import svg from "./static/good.svg?raw";
</script>

<template>
  <div class="sya-application-score-face--comp">
    <div class="svg" v-html="svg"></div>
    <picture>
      <source srcset="./static/good.webp" type="image/webp" />
      <img src="./static/good.gif" alt="😀" />
    </picture>
  </div>
</template>
