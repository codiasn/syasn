<script lang="ts" setup>
const type = ref(useRoute().params.type as "animals_pets");
const group = ref(Utils.schemaOrg.groups[type.value]);

if (!group.value) {
  showError({
    statusCode: 404,
    statusMessage: "category_not_found",
  });
}
</script>

<template>
  <v-app>
    <!-- <ui-header>
      <div
        class="h-100"
        style="width: 250px; max-width: 50%; display: flex; align-items: center"
      >
        <ui-sya-product-search-modal>
          <template #activator="{ props }">
            <div
              v-bind="props"
              class="border border-md rounded-pill px-5 d-flex align-center"
              style="
                height: 42px;
                width: 100%;
                font-size: 14px;
                user-select: none;
                cursor: pointer;
              "
            >
              <i class="fi fi-br-search mr-3"></i>

              <span
                class="opacity-30"
                style="
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  line-height: 1.1;
                  font-size: 14px;
                "
              >
                {{ i18n.t("components.pages.home.search.placeholder") }}
              </span>
            </div>
          </template>
        </ui-sya-product-search-modal>
      </div>
    </ui-header> -->

    <v-main>
      <ui-sya-product-page-search :type-code="type" />
    </v-main>
  </v-app>
</template>
