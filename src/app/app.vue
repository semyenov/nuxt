<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="route.meta.layout ? route.meta.layout : route.fullPath" />
  </NuxtLayout>
</template>
