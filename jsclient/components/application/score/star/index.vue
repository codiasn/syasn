<script lang="ts" setup>
import cStar from "./star.vue";
import type { IApplication, IScore } from "~/jsclient/interfaces";

const props = defineProps({
  application: { type: Object as PropType<IApplication>, required: true },
  score: { type: Object as PropType<Partial<IScore>>, required: true },
  cb: { type: Object as PropType<(v: number) => void>, required: true },
});

const score = ref<number>();

onMounted(() => {
  if (props.score.score) score.value = props.score.score;
});

function setScore(value: number) {
  score.value = value;
  props.cb(score.value);
}
</script>

<template>
  <div
    class="sya-application-score-star"
    :class="{ selected: score !== undefined }"
    :style="{ '--size': '42px' }"
  >
    <c-star
      v-for="i in application.max"
      :key="i"
      class="one"
      @click="setScore(i)"
      :class="{ selected: score === i }"
    >
    </c-star>
  </div>
</template>

<style lang="scss">
.sya-application-score-star {
  width: max-content;
  display: flex;
  align-items: center;

  &.selected {
    .svg {
      fill: "#00e27c";

      &.plain {
        display: block;
      }
      &.outline {
        display: none;
      }
    }
  }

  .one {
    width: var(--size);
    height: var(--size);
  }

  .one.selected {
    ~ .one {
      .svg {
        &.plain {
          display: none;
        }
        &.outline {
          display: block;
        }
      }
    }
  }

  &:hover {
    .svg {
      &.plain {
        display: block !important;
      }
      &.outline {
        display: none !important;
      }
    }
  }

  .one:hover ~ .one {
    .svg {
      &.plain {
        display: none !important;
      }
      &.outline {
        display: block !important;
      }
    }
  }
}
</style>
