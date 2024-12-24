<script setup lang="ts">
import type { VForm } from "vuetify/components";

interface VFormInput {
  key: string;
  type?: string;
  icon?: string;
  label: string;
  rules?: ((v: string) => string | true)[];
}

const emit = defineEmits<{
  (e: "submit", value: { [key: string]: any }): void;
}>();

const props = defineProps({
  inputs: { type: Array as PropType<VFormInput[][]>, default: [] },
  submitText: { type: String },
});

const i18n = useI18n();
const submitting = ref<string | boolean>(false);
const form = ref<VForm>();

const values = ref<{ [key: string]: any }>({});

const currentItem = ref(0);

const errorMessages = ref<string[]>([]);

watch(() => currentItem.value, onCurrentItem);
onMounted(onCurrentItem);
function onCurrentItem() {
  errorMessages.value = [];
  if (props.inputs.length > 1) {
    useRouter().replace({ query: { step: currentItem.value } });
  }
}

watch(() => values.value, validCurrentItem, { deep: true });
async function validCurrentItem() {
  errorMessages.value = [];

  const errors = await form.value?.validate();
  if (errors) {
    errors.errors.forEach((error) => {
      errorMessages.value.push(...error.errorMessages);
    });
  }
}

async function gotoNext() {
  if (!form.value) return;

  await validCurrentItem();
  if (errorMessages.value.length) return;

  if (currentItem.value < props.inputs.length - 1) {
    currentItem.value++;
  } else emit("submit", values.value);
}
</script>

<template>
  <v-form
    :key="currentItem"
    @submit.prevent="gotoNext"
    ref="form"
    class="ui-form d-flex flex-column"
  >
    <slot
      name="back"
      v-if="currentItem > 0"
      :goBack="
        () => {
          if (currentItem > 0) currentItem--;
        }
      "
    />

    <div class="ui-form-container">
      <v-text-field
        v-for="(item, i) in inputs[currentItem]"
        :key="i"
        :placeholder="item.label"
        :type="item.type"
        :rules="item.rules"
        :style="{ animationDelay: `${i * 0.25}s` }"
        v-model="values[item.key]"
        variant="solo-filled"
        class="mb-2 animate__animated animate__fadeInRight animate__faster"
        rounded="pill"
        flat
        hide-details
      >
        <template #prepend-inner v-if="item.icon">
          <div
            style="
              width: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <i :class="item.icon"></i>
          </div>
        </template>
      </v-text-field>

      <div class="d-flex flex-wrap align-center justify-end ga-1 mx-5 ml-auto">
        <v-chip
          v-for="message in errorMessages"
          variant="tonal"
          size="small"
          color="red"
        >
          {{ message }}
        </v-chip>
      </div>
    </div>

    <div
      class="ui-form-action d-flex ga-2 mx-5 mt-5 align-center justify-center"
    >
      <v-btn rounded color="black" type="submit" :loading="submitting == true">
        {{
          currentItem < inputs.length - 1
            ? i18n.t("next")
            : submitText || i18n.t("submit")
        }}

        <template v-if="currentItem < inputs.length - 1" #append>
          <i class="fi fi-rr-arrow-right"></i>
        </template>
      </v-btn>
    </div>
  </v-form>
</template>
