<script setup lang="ts">
import { useI18n } from 'vue-i18n'

definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const { t } = useI18n()

const { data } = await useFetch('/api/test', {
  method: 'get',
  query: {
    name: 'Alexander',
  },
})
</script>

<template>
  <div class="page page-index w-full h-full">
    <div class="flex flex-row sticky box-color__default--2">
      <PageTitle>{{ t('index.title') }}</PageTitle>
    </div>
    <div
      class="flex flex-col items-start p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded max-w-200"
    >
      <PageProse v-if="data" class="mb-6">{{ data.text }}</PageProse>
      <div class="flex flex-row gap-2 text-3xl justify-center">
        <i class="i-logos:vue text-6xl" />
        <div
          class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy"
        />
        <i class="i-mdi:alarm text-orange-400" un-hover="text-blue-400" />
        <i class="i-ph:anchor-simple text-gray-600" un-dark="text-gray-400" />
        <i
          class="i-ph:airplane-duotone text-blue-600"
          un-dark="text-blue-500"
        />
      </div>
    </div>
  </div>
</template>
