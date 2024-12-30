<script lang="ts" setup>
import svg from "./static/okay.svg?raw";
</script>

<template>
  <div class="sya-application-score-face--comp">
    <div class="svg" v-html="svg"></div>
    <picture>
      <source srcset="./static/okay.webp" type="image/webp" />
      <img src="./static/okay.gif" alt="🤨" />
    </picture>
  </div>
</template>
