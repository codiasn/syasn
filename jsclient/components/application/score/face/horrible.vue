<script lang="ts" setup>
import svg from "./static/horrible.svg?raw";
</script>

<template>
  <div class="sya-application-score-face--comp">
    <div class="svg" v-html="svg"></div>
    <picture>
      <source srcset="./static/horrible.webp" type="image/webp" />
      <img src="./static/horrible.gif" alt="😣" />
    </picture>
  </div>
</template>
