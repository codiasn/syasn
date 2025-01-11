<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Swiper as SwiperClass } from "swiper";

const i18n = useI18n();
const localePath = useLocalePath();
const sya = useSya();

const _swiper = ref<SwiperClass>();
</script>

<template>
  <v-app>
    <ui-header-default />

    <v-main>
      <div
        class="text-center"
        style="
          min-height: calc(100lvh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        "
      >
        <v-container>
          <!-- <v-btn
            :to="localePath({ name: 'client', params: { client: 'codia' } })"
          >
            codia
          </v-btn> -->

          <v-btn
            color="red"
            variant="flat"
            size="x-large"
            class="mb-5"
            style="border-radius: 0.6em"
          >
            <template #prepend>
              <i class="fi fi-sr-building" style="font-size: 22px"></i>
            </template>
            {{ i18n.t("components.pages.home.forCompany") }}
          </v-btn>
          <h1
            class="font-weight-bold"
            style="font-size: clamp(2rem, 8.2352941176vw, 5rem); line-height: 1"
            v-html="i18n.t('components.pages.home.title')"
          ></h1>
          <div
            style="font-size: 18px"
            class="mt-3"
            v-html="i18n.t('components.pages.home.subtitle')"
          ></div>

          <ui-sya-product-search-modal>
            <template #activator="{ props }">
              <v-text-field
                v-bind="props"
                class="ui-pages-home-search"
                rounded="pill"
                :placeholder="
                  i18n.t('components.pages.home.search.placeholder')
                "
                hide-details
                readonly
              >
                <template #append-inner>
                  <v-btn icon>
                    <i class="fi fi-br-search"></i>
                  </v-btn>
                </template>
              </v-text-field>
            </template>
          </ui-sya-product-search-modal>
        </v-container>
      </div>

      <div class="bg-black py-3">
        <div
          style="position: relative; width: calc(100% - 50px)"
          class="mx-auto"
        >
          <swiper
            :spaceBetween="15"
            :slidesPerView="'auto'"
            :grabCursor="true"
            :modules="[]"
            style="width: calc(100lvw - 50px)"
            @init="(s) => (_swiper = s)"
          >
            <swiper-slide
              v-for="(group, code) in Utils.schemaOrg.groups"
              style="width: max-content"
            >
              <v-btn
                rounded
                size="large"
                variant="text"
                color="white"
                :to="
                  localePath({
                    name: 'type-type',
                    params: { type: code },
                  })
                "
              >
                <template #prepend>
                  <ui-svg :name="`schemaorg/${code}`" size="28" />
                </template>
                <div style="font-size: 14px">
                  {{ i18n.t(`shemaOrg.${code}`) }}
                </div>
              </v-btn>
            </swiper-slide>
          </swiper>

          <v-btn
            icon
            border
            size="x-small"
            variant="flat"
            color="background"
            style="
              position: absolute;
              top: 50%;
              left: -5px;
              transform: translateY(-50%);
              z-index: 1;
            "
            @click="_swiper?.slidePrev()"
          >
            <i class="fi fi-br-angle-left"></i>
          </v-btn>
          <v-btn
            border
            icon
            size="x-small"
            variant="flat"
            color="background"
            style="
              position: absolute;
              top: 50%;
              right: -5px;
              transform: translateY(-50%);
              z-index: 1;
            "
            @click="_swiper?.slideNext()"
          >
            <i class="fi fi-br-angle-right"></i>
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.ui-pages-home-search {
  max-width: 552px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  .v-field.v-field--appended {
    padding-right: 5px !important;
  }
}
</style>
