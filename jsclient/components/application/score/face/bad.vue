<script lang="ts" setup>
import svg from "./static/bad.svg?raw";
</script>

<template>
  <div class="sya-application-score-face--comp">
    <div class="svg" v-html="svg"></div>
    <picture>
      <source srcset="./static/bad.webp" type="image/webp" />
      <img src="./static/bad.webp" alt="😞" />
    </picture>
  </div>
</template>
