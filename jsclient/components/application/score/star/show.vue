<script lang="ts" setup>
import cStar from "./star.vue";
import type { IApplication } from "~/jsclient/interfaces";

const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
  score: { type: Number, default: 0 },
  size: { type: [String], default: "36px" },
});
</script>

<template>
  <div class="d-flex align-center" style="gap: 2px">
    <c-star
      v-for="i in application.max"
      :key="i"
      :class="{ active: i <= score }"
      :style="{ width: size, height: size }"
    >
    </c-star>
  </div>
</template>

<style lang="scss"></style>
