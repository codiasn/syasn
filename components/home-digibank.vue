<template>
  <section class="sect" style="background-color: #593be8">
    <!-- <video
      src="https://cdn.dribbble.com/users/517584/screenshots/18374557/media/95589c3b294b46a2693bbfcae2056bc2.mp4"
      style="height: 100%; max-width: 100%"
      autoplay
      loop
    ></video> -->

    <img
      :src="'/images/digibank.png'"
      style="
        object-fit: cover;
        object-position: center bottom;
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
      "
    />
    <div class="container h-100">
      <div class="mb-auto mt-16 pt-16">
        <span class="bg-black font-berlin text-h4 font-weight-bold">
          Digi <br />
          Bank
        </span>
      </div>
      <p class="desc font-berlin text-h4">
        <span>
          Nous avons réinventer la banque pour qu'elle vous suit partout.
        </span>
      </p>

      <div class="mb-16 pb-16">
        <v-btn
          color="black"
          variant="flat"
          class="mt-5"
          rounded
          :to="{ name: 'digibank' }"
        >
          En savoir plus

          <template #append>
            <i class="fi fi-rr-arrow-small-right"></i>
          </template>
        </v-btn>
      </div>

      <!-- <md-next-link :to="{ name: 'digitalbank' }">
        <div>En savoir plus</div>
      </md-next-link> -->
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
section {
  position: relative;
  min-height: 100lvh;

  > .container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 992px;

    display: flex;
    flex-direction: column;

    .logo {
      width: 164px;
      padding: 10px;
    }

    .desc {
      font-size: 28px;
      max-width: 410px;
      line-height: 1.2;
      font-weight: bold;
      margin-top: 15px;

      span {
        background-color: rgb(0, 0, 0);
        color: #fff;
      }
    }
  }
}
</style>
