<script setup lang="ts">
const route = useRoute()
const contentPath = route.path.replace(/^\/content/s, '/')
</script>

<template>
  <div class="page page-index w-full h-full">
    <div class="flex flex-row sticky box-color__default--2">
      <PageTitle>Content page</PageTitle>
    </div>
    <div
      class="flex flex-col items-start p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200"
    >
      <ContentDoc :path="contentPath" />
    </div>
  </div>
</template>
