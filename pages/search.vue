<script lang="ts" setup>
const querys = useRoute().query;
</script>

<template>
  <ui-sya-product-page-search :start-params="querys" />
</template>
