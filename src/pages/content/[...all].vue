<script setup lang="ts">
const route = useRoute()
const contentPath = route.path.replace(/^\/content/s, '/')
</script>

<template>
  <div class="page page-index">
    <div class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-200">
      <PageTitle>Content page</PageTitle>
      <ContentDoc :path="contentPath" />
    </div>
  </div>
</template>
