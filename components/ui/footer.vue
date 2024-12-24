<template>
  <v-footer class="bg-background border-t ui-footer d-block pa-0">
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" md="3" sm="6">
          <nuxt-link
            class="d-flex align-center ga-2 text-dark font-weight-bold text-h5 pl-2"
            style="width: max-content"
            :to="{ name: 'index' }"
          >
            <!-- <div class="font-mackinac">Codia</div> -->
            <div
              style="height: 64px; width: 64px"
              class="bg-primary d-flex align-end justify-end pb-1 px-2"
            >
              <ui-svg name="logo" width="32" height="32" />
            </div>
          </nuxt-link>
        </v-col>

        <v-col cols="6" md="3" sm="6">
          <div class="text-h5 font-weight-bold font-mackinac ml-1">
            {{ $t("solutions") }}
          </div>

          <div>
            <v-btn variant="text" color="dark" :to="{ name: 'digibank' }">
              digibank
            </v-btn>
          </div>

          <div>
            <v-btn
              variant="text"
              color="dark"
              href="https://www.tarico.io/input/ab3376ba-7799-4f89-90ed-062c993c0b19"
            >
              tarico
            </v-btn>
          </div>

          <div>
            <v-btn
              variant="text"
              color="dark"
              href="https://weconvert.codia.sn"
              target="_blank"
            >
              weConvert
            </v-btn>
          </div>
        </v-col>

        <v-col cols="6" md="3" sm="6">
          <div class="text-h5 font-weight-bold font-mackinac ml-1">
            {{ $t("company") }}
          </div>

          <div>
            <v-btn variant="text" color="dark" :to="{ name: 'about' }">
              {{ $t("aboutUs") }}
            </v-btn>
          </div>

          <div>
            <v-btn
              variant="text"
              color="dark"
              href="https://www.tarico.io/input/ab3376ba-7799-4f89-90ed-062c993c0b19"
            >
              {{ $t("contactUs") }}
            </v-btn>
          </div>

          <div>
            <v-btn variant="text" color="dark" :to="{ name: 'careers' }">
              <!-- <i class="fi fi-br-arrow-up-right-from-square text-body-2"></i> -->
              {{ $t("workWithUs") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="border-t bg-surface py-3 px-10 d-flex ga-5">
      <div>© 2024</div>

      <div class="ml-auto d-flex align-center ga-3">
        <nuxt-link
          class="text-dark"
          href="mailto:contact@codia.sn"
          target="_blank"
        >
          <ui-svg name="mail" width="22" height="22" />
        </nuxt-link>

        <nuxt-link
          class="text-dark"
          href="https://www.linkedin.com/company/codiasn"
          target="_blank"
        >
          <ui-svg name="linkedin" width="22" height="22" />
        </nuxt-link>
      </div>
    </div>
  </v-footer>
</template>

<style lang="scss">
.ui-footer {
  .v-btn {
    justify-content: flex-start;
    padding: 0;
    padding-left: 5px;
    padding-right: 5px;

    .v-btn__overlay {
      background-color: transparent !important;
      // display: none !important;
    }
  }
}
</style>
