<template>
  <div class="pa-5 border rounded-lg">
    <div class="d-flex align-center ga-2 mb-3">
      <div>
        <div
          class="skeleton rounded-circle"
          style="width: 42px; height: 42px"
        ></div>
      </div>
      <div style="width: 100%">
        <div
          class="skeleton"
          style="width: 200px; max-width: 50%; height: 10px"
        ></div>

        <div
          class="skeleton"
          style="width: 50px; height: 10px; margin-top: 3px"
        ></div>
      </div>
    </div>

    <div class="d-flex align-center mt-1" style="gap: 3px">
      <div
        v-for="i in 5"
        style="width: 28px; height: 28px"
        class="skeleton"
      ></div>
    </div>

    <div class="mt-5">
      <div
        v-for="i in 5"
        style="height: 10px"
        :style="{ width: `${Math.floor(Math.random() * (80 - 40 + 1)) + 40}%` }"
        class="skeleton mt-1"
      ></div>
    </div>
  </div>
</template>
