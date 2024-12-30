<script lang="ts" setup>
import type { IScore } from "~/jsclient/interfaces";
import star from "./static/star.svg?raw";

const props = defineProps({
  editMode: { type: Boolean, default: false },
  onlyActiceScore: { type: Boolean, default: false },
  size: { type: String, default: "36px" },
  score: { type: Object as PropType<Partial<IScore>> },
  cb: { type: Object as PropType<(v: number) => void> },
});

const container = ref<HTMLDivElement>();
const selectedScore = ref<number>();
const activeScore = ref<number>(1);

function handleMouseMove(event: MouseEvent) {
  if (!container.value) return;
  const containerRect = container.value.getBoundingClientRect();

  if (
    event.clientX > containerRect.left &&
    event.clientX < containerRect.right &&
    event.clientY > containerRect.top &&
    event.clientY < containerRect.bottom
  ) {
    const stars = container.value.querySelectorAll<HTMLDivElement>(
      ".sya-application-score-star---star"
    );

    stars.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (event.clientX > rect.left && event.clientX < rect.right) {
        container.value!.setAttribute("data-temp-score", `${idx + 1}`);

        stars.forEach((star, starIdx) => {
          if (starIdx === idx) {
            star.setAttribute("data-temp-active", "");
          } else {
            star.removeAttribute("data-temp-active");
          }

          // star.style.backgroundColor = starIdx <= idx ? colorMap[idx + 1] : "";
        });
      }
    });
  } else {
    container.value!.removeAttribute("data-temp-score");
  }
}

function setSelectedScore(v: number) {
  if (!props.editMode) return;
  if (!container.value) return;

  selectedScore.value = v;
  container.value.setAttribute("data-score-selected", v.toString());

  const stars = container.value.querySelectorAll<HTMLDivElement>(
    ".sya-application-score-star---star"
  );

  stars.forEach((star, idx) => {
    if (v === idx + 1) {
      star.setAttribute("data-selected", "");
    } else {
      star.removeAttribute("data-selected");
    }
  });

  if (props.cb) props.cb(v);
}

onMounted(() => {
  if (props.editMode) selectedScore.value = props.score?.score;
  else {
    activeScore.value = Math.round(props.score?.score || 1);
    activeScore.value < 1 ? (activeScore.value = 1) : activeScore.value;

    if (!container.value) return;

    container.value.setAttribute(
      "data-score-actived",
      activeScore.value.toString()
    );

    const stars = container.value.querySelectorAll<HTMLDivElement>(
      ".sya-application-score-star---star"
    );

    stars.forEach((star, idx) => {
      if (activeScore.value === idx + 1) {
        star.setAttribute("data-actived", "");
      } else {
        star.removeAttribute("data-actived");
      }
    });
  }
});

onMounted(() => {
  if (props.editMode) {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div
    ref="container"
    class="sya-application-score-star"
    :class="{ 'edit-mode': editMode, 'only-actice-score': onlyActiceScore }"
  >
    <div
      v-for="i in 5"
      :key="i"
      :style="{ width: size, height: size }"
      class="sya-application-score-star---star"
      @click="setSelectedScore(i)"
    >
      <div class="svg" v-html="star"></div>
    </div>
  </div>
</template>

<style lang="scss">
.sya-application-score-star {
  --sya-score-rating-color-default: #eaeaea;
  --sya-score-rating-color-1: #fb3b3b;
  --sya-score-rating-color-2: #ffb300;
  --sya-score-rating-color-3: #ffff00;
  --sya-score-rating-color-4: #00e275;
  --sya-score-rating-color-5: #08c96c;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  .sya-application-score-star---star {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    background-color: var(--sya-score-rating-color-default);
    border-radius: 0.06em;

    .svg {
      width: 70%;
      height: 70%;

      svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: #212121;
      }
    }
  }

  &[data-score-actived="1"],
  &[data-score-selected="1"],
  &[data-temp-score="1"] {
    --sya-application-score-active-color: var(--sya-score-rating-color-1);
  }

  &[data-score-actived="2"],
  &[data-score-selected="2"],
  &[data-temp-score="2"] {
    --sya-application-score-active-color: var(--sya-score-rating-color-2);
  }

  &[data-score-actived="3"],
  &[data-score-selected="3"],
  &[data-temp-score="3"] {
    --sya-application-score-active-color: var(--sya-score-rating-color-3);
  }

  &[data-score-actived="4"],
  &[data-score-selected="4"],
  &[data-temp-score="4"] {
    --sya-application-score-active-color: var(--sya-score-rating-color-4);
  }

  &[data-score-actived="5"],
  &[data-score-selected="5"],
  &[data-temp-score="5"] {
    --sya-application-score-active-color: var(--sya-score-rating-color-5);
  }

  &.edit-mode {
    &[data-temp-score] {
      .sya-application-score-star---star {
        background-color: var(--sya-application-score-active-color);

        &[data-temp-active] ~ .sya-application-score-star---star {
          background-color: var(--sya-score-rating-color-default);
        }
      }
    }

    .sya-application-score-star---star {
      cursor: pointer;
    }

    &:not([data-temp-score]) {
      &[data-score-selected] {
        .sya-application-score-star---star {
          background-color: var(--sya-application-score-active-color);

          &[data-selected] ~ .sya-application-score-star---star {
            background-color: var(--sya-score-rating-color-default);
          }
        }
      }
    }
  }

  &:not(.edit-mode) {
    &.only-actice-score {
      .sya-application-score-star---star:not([data-actived]) {
        display: none;
      }
    }

    &[data-score-actived] {
      .sya-application-score-star---star {
        background-color: var(--sya-application-score-active-color);

        &[data-actived] ~ .sya-application-score-star---star {
          background-color: var(--sya-score-rating-color-default);
        }
      }
    }
  }
}
</style>
