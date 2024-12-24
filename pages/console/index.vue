<script lang="ts" setup>
import type { IApplication } from "~/jsclient/interfaces";
const sya = useSya();
const applications = ref<IApplication[]>([]);
const container = ref<HTMLDialogElement>();
const appColor = ref({ color: "", darker: "" });

onMounted(async () => {
  applications.value = await sya.application.list();

  if (container.value) {
    sya.application.components.build({
      target: container.value,
      id: applications.value[0].id,
      onSend(score) {
        console.log(score);
      },
    });
  }
});

const colors = [
  "#00FF00",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#008080",
  "#5CB338",
  "#DA498D",
  "#7E5CAD",
  "#118B50",
  "#F72C5B",
  "#F7C331",
  "#8B5DFF",
  "#B03052",
  "#608BC1",
  "#88C273",
  "#F95454",
  "#FFF100",
  "#006BFF",
  "#72BF78",
];

const getRandomColors = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 247, g: 44, b: 91 };
  }

  function darkenColor(col: { r: number; g: number; b: number }, factor = 0.8) {
    return {
      r: Math.max(0, Math.floor(col.r * factor)),
      g: Math.max(0, Math.floor(col.g * factor)),
      b: Math.max(0, Math.floor(col.b * factor)),
    };
  }

  function rgbToString(col: { r: number; g: number; b: number }) {
    return `${col.r}, ${col.g}, ${col.b}`;
  }

  const rgbColor = hexToRgb(color);
  const darkerColor = darkenColor(rgbColor);

  appColor.value = {
    color: rgbToString(rgbColor),
    darker: rgbToString(darkerColor),
  };

  return {
    "--bg-color": rgbToString(rgbColor),
    "--bg-color-darker": rgbToString(darkerColor),
  };
};

function getRandomColorWithContrast(): string {
  // Helper function to calculate luminance of a color
  function calculateLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  // Check if color is yellowish (high red and green, low blue)
  function isYellowish(r: number, g: number, b: number): boolean {
    return r > 200 && g > 200 && b < 100;
  }

  // Check if color is too neutral (white, gray, black, etc.)
  function isNeutral(r: number, g: number, b: number): boolean {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max - min < 30 || (max > 200 && min > 200); // Low saturation or very light colors
  }

  // Check if color is too light or too dark
  function isTooLightOrTooDark(luminance: number): boolean {
    return luminance > 0.9 || luminance < 0.2;
  }

  // Generate bright random RGB values
  function getRandomBrightRGB(): [number, number, number] {
    return [
      Math.floor(Math.random() * 156) + 100, // Ensures R is between 100 and 255
      Math.floor(Math.random() * 156) + 100, // Ensures G is between 100 and 255
      Math.floor(Math.random() * 156) + 100, // Ensures B is between 100 and 255
    ];
  }

  let color: [number, number, number];
  let luminance: number;

  do {
    color = getRandomBrightRGB();
    luminance = calculateLuminance(color[0], color[1], color[2]);
  } while (
    isTooLightOrTooDark(luminance) ||
    isYellowish(color[0], color[1], color[2]) ||
    isNeutral(color[0], color[1], color[2])
  ); // Ensure luminance, exclude yellowish, neutral, and too light/dark colors

  // Convert RGB to hex color string
  const hexColor = `#${color[0].toString(16).padStart(2, "0")}${color[1]
    .toString(16)
    .padStart(2, "0")}${color[2].toString(16).padStart(2, "0")}`;
  return hexColor;
}
</script>

<template>
  <div
    ref="container"
    class="ui-sya-container h-screen"
    :style="getRandomColors()"
  ></div>
</template>

<style lang="scss">
.ui-sya-container {
  background-color: rgba(var(--bg-color));
  position: relative;

  .c-sya {
    height: 100%;
    padding: 20px;
    background-color: inherit;

    .c-cya-application-title {
      font-size: 36px !important;
      line-height: 1.1 !important;
      font-weight: bold !important;
      font-family: mackinac;
    }

    .c-sya-application-description {
      line-height: 1.4;
      font-family: mackinac;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 22px;
    }

    .c-sya-application-star {
      margin: auto;
      margin-top: 20px;

      .rating__icon {
        width: 39px;
        height: 39px;
      }
    }

    .c-sya-main {
      background-color: inherit;
    }

    .c-sya-btn-grp {
      position: absolute;
      bottom: 0;
      left: 0;
      justify-content: center;
      width: 100%;
      min-height: 150px;
      background-color: rgba(var(--bg-color-darker));
      background: linear-gradient(
        180deg,
        rgba(var(--bg-color-darker), 0) 0%,
        rgba(var(--bg-color-darker), 1) 100%
      );
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
}
</style>
