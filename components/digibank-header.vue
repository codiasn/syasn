<script lang="ts" setup></script>

<template>
  <v-app class="no-min-width" theme="dark">
    <div
      class="position-relative"
      style="
        margin: auto;
        width: 100%;
        height: 552px;
        display: flex;
        align-items: flex-end;
        position: relative;
      "
    >
      <div
        class="d-none d-sm-block bg-red"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
      >
        <img
          :src="'/images/digibank.png'"
          style="
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
          "
        />

        <video
          :src="'/images/digibank.mp4'"
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
          "
          autoplay
          loop
        ></video>
      </div>

      <v-container class="position-relative pa-0 mb-10">
        <div
          class="d-block d-sm-none bg-red position-relative"
          style="height: 350px"
        >
          <img
            :src="'/images/digibank.png'"
            style="
              object-fit: cover;
              object-position: center top;
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              top: 0;
              left: 0;
            "
          />

          <video
            :src="'/images/digibank.mp4'"
            style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center top;
              position: absolute;
              top: 0;
              left: 0;
              display: block;
            "
            autoplay
            loop
          ></video>

          <span
            class="bg-primary font-berlin px-1 text-h6"
            style="position: absolute; top: 30px; left: 20px"
          >
            digi bank
          </span>
        </div>

        <div class="px-10 pt-10 pt-sm-0" style="max-width: 772px; margin: auto">
          <span
            class="bg-primary font-berlin px-1 text-h6 d-none d-sm-block mb-2"
            style="width: max-content"
          >
            digi bank
          </span>
          <h1
            class="text-h5 text-sm-h3 text-sm-h2 font-berlin font-weight-bold"
            style="line-height: 1.2"
          >
            <span
              class="bg-background"
              v-html="$t('digibankpage.header.title')"
            >
            </span>
          </h1>

          <div class="d-flex align-center flex-wrap ga-2 mt-10">
            <slot name="action" />
          </div>
        </div>
      </v-container>
    </div>
  </v-app>
</template>
