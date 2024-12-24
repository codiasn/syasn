<script lang="ts" setup>
onMounted(() => {
  const router = useRouter();
  const user = useSya().user.current;

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de sign
  if (!user) {
    return router.replace({
      name: "login",
      query: { next: router.currentRoute.value.path },
    });
  }
});
</script>

<template>
  <nuxt-page />
</template>
