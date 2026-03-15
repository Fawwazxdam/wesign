<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "auth") return AuthLayout;
  if (route.meta.layout === "authenticated") return AuthenticatedLayout;
  return DefaultLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style>
.container {
  min-height: 80vh;
}
</style>
