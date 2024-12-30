<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import type { IApplication, IScore } from "~/jsclient/interfaces";

const sya = useSya();
const applications = ref<IApplication[]>([]);
const container = ref<HTMLDialogElement>();
const appColor = ref({ color: "", darker: "" });

const score = ref<Partial<IScore>>({});

onMounted(async () => {
  applications.value = await sya.application.list();
});

const colors = [
  "#00FF00",
  "#FF00FF",
  "#00FFFF",
  "#008080",
  "#5CB338",
  "#DA498D",
  "#7E5CAD",
  "#118B50",
  "#F72C5B",
  "#8B5DFF",
  "#B03052",
  "#608BC1",
  "#88C273",
  "#F95454",
  "#006BFF",
  "#72BF78",
];

const _colors = ref(colors);

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

  function darkenColor(col: { r: number; g: number; b: number }, factor = 0.5) {
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
  <v-app>
    <!-- style="background: #e3ffe7" -->
    <v-container>
      <v-row v-if="applications.length">
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="application in applications"
          :key="application.id"
        >
          <ui-sya-application-card :application="application" />
        </v-col>
      </v-row>
    </v-container>

    <!-- <swiper
      v-if="applications.length"
      :direction="'vertical'"
      style="height: 100lvh; width: 100lvw"
    >
      <swiper-slide
        v-for="application in applications"
        :key="application.id"
        style="
          height: 100lvh;
          /* background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%); */
        "
      >
        <ui-sya-application :application="application" />
      </swiper-slide>
    </swiper> -->
  </v-app>
</template>
