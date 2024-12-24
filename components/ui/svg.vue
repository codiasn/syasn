<template>
  <component :is="icon" :style="_style" ref="iconRef" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { defineAsyncComponent } from "vue";

const iconRef = ref<HTMLElement | null>(null);

const props = defineProps({
  name: { type: String, required: true },
  width: { type: String },
  height: { type: String },
  size: { type: String },
  style: { type: Object as PropType<CSSProperties>, default: {} },
});

const icons = import.meta.glob(`@/assets/svgs/**/*.svg`);

const _style = computed(() => {
  const styles: any = { ...props.style };

  if (props.size) {
    styles.width = `${props.size}px`;
    styles.height = `${props.size}px`;
  }

  if (props.width) styles.width = `${props.width}px`;
  if (props.height) styles.height = `${props.height}px`;

  return styles;
});

const icon = computed(() => {
  const comp = defineAsyncComponent(async () => {
    return icons[`/assets/svgs/${props.name}.svg`]() as any;
  });

  return comp;
});
</script>
