<script lang="ts" setup>
import type { IProductAllData } from "~/jsclient/interfaces/product";

const props = defineProps({
  product: {
    type: Object as PropType<IProductAllData>,
    required: true,
  },
  hideDescription: { type: Boolean, default: false },
});

const sya = useSya();
const localePath = useLocalePath();
</script>

<template>
  <nuxt-link
    v-if="product"
    class="ui-sya-product-card border rounded-lg"
    itemscope
    :itemtype="
      Utils.schemaOrg.getSchemaFromCode(product.metadata?.type) ||
      'http://schema.org/Product'
    "
    :to="
      localePath({
        name: 'product-slug',
        params: {
          slug: product.slug,
        },
      })
    "
    style=""
  >
    <div
      class="pa-5 w-100"
      style="
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 0.9em;
        height: 100%;
      "
    >
      <div>
        <div class="d-flex ga-3">
          <ui-sya-product-logo :product="product" class="mb-2" />

          <div class="mt-">
            <div class="mt-1 mb-1" style="line-height: 1.1" itemprop="name">
              {{ product.name }}
            </div>
            <ui-sya-product-aggregate-rating :product="product" show-resume>
              <syaScoreRate
                :product="product"
                :score="product.stats?.average"
                size="28px"
              />
            </ui-sya-product-aggregate-rating>
          </div>

          <v-badge
            location="bottom end"
            class="ui-sya-product-card-user-score ml-auto mt-2"
          >
            <img
              src="https://i.pinimg.com/originals/86/d6/d1/86d6d11ac34ed85df4af65ecd1463355.jpg"
              width="32"
              height="32"
              style="border-radius: 100%; object-fit: cover"
            />

            <template #badge>
              <syaScoreRate
                only-actice-score
                size="18px"
                :product="product"
                :score="3"
              />
            </template>
          </v-badge>
        </div>

        <p
          v-if="!hideDescription && product.description"
          itemprop="description"
          :aria-label="`${product.metadata?.type || 'Product'} description`"
          class="mt-2"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 5;
            line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.1;
            font-size: 14px;
          "
        >
          {{ product.description }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.ui-sya-product-card {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  height: calc(100% - 0px);
  width: 100%;
  cursor: pointer;
  display: block;
  color: rgba(var(--v-theme-on-background));

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .ui-sya-product-card-user-score {
    .v-badge__badge {
      background-color: transparent;
      padding: 0;
    }
  }
}
</style>
