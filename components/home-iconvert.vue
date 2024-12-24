<template>
  <div style="background-color: #ebe9e9; position: relative">
    <!-- <img
      :src="'/images/iconvert.png'"
      class="u"
      style="
        object-fit: contain;
        object-position: center;
        width: 100%;
        height: 100%;
        display: block;
        bottom: 0;
        right: 0;
        position: absolute;
      "
    /> -->
    <div
      style="
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgb(204, 89, 0);
        background: linear-gradient(
          200deg,
          rgba(204, 89, 0, 0) 0%,
          #0745ec 100%
        );
      "
    ></div>
    <v-container class="position-relative">
      <v-row>
        <v-col cols="12" sm="8">
          <div class="container">
            <div class="d-flex align-center ga-2" style="margin-top: 150px">
              <img
                :src="'/images/iconvert-logo.png'"
                alt="iconvert"
                style="width: 64px"
              />
              <span
                class="font-berlin text-h4 font-weight-bold px-2 rounded-lg"
                style="
                  background-color: #2bcbfc;
                  color: #000;
                  width: max-content;
                "
              >
                weConvert
              </span>
            </div>
            <p class="desc font-berlin text-h5 my-5">
              <span>
                Votre compagnon de confiance pour convertir vos devises en un
                instant. Que ce soit pour vos voyages, vos affaires ou vos
                achats en ligne, weConvert vous offre des taux de change précis
                et actualisés, le tout dans une interface simple et intuitive.
              </span>
            </p>

            <div class="mb-16 pb-16 mt-1">
              <v-btn
                color="black"
                variant="flat"
                rounded
                href="https://weconvert.codia.sn"
                target="_blank"
              >
                Convertir

                <template #append>
                  <i class="fi fi-rr-arrow-small-right"></i>
                </template>
              </v-btn>
            </div>

            <!-- <md-next-link :to="{ name: 'digitalbank' }">
        <div>En savoir plus</div>
      </md-next-link> -->
          </div>
        </v-col>

        <v-col cols="12" sm="6"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
section {
  position: relative;
  min-height: 100lvh;

  > .u {
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
    display: block;
    bottom: 0;
    right: 0;
    position: absolute;

    @media (max-width: 662px) {
      position: relative;
    }
  }

  > .container {
    width: 90%;
    max-width: 992px;
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 662px) {
      height: unset;
    }

    .logo {
      width: 164px;
      padding: 10px;
    }

    .desc {
      font-size: 28px;
      max-width: 442px;
      line-height: 1.2;
    }
  }
}
</style>
