<script lang="ts" setup>
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

  // appColor.value = {
  //   color: rgbToString(rgbColor),
  //   darker: rgbToString(darkerColor),
  // };

  return {
    "--bg-color": rgbToString(rgbColor),
    "--bg-color-darker": rgbToString(darkerColor),
  };
};
</script>

<template>
  <div class="pa-5">
    <div class="mb-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
      laborum voluptatem iste minima fugiat architecto ut veritatis provident?
      Quos vel similique maxime sint optio quidem magni asperiores placeat
      quisquam provident!
    </div>

    <v-btn :to="{ name: 'console' }">console</v-btn>
  </div>
</template>
