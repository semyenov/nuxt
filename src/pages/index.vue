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
  <Winbox
    show
    teleport-id="teleport-layer--10"
    :params="{
      title: t('index.title'),
      class: ['simple', 'wb-left', 'no-move', 'no-close', 'border-l-none'],
      index: 10,
      border: 0,
      top: 0,
      left: 45,
      bottom: 0,
      right: '50%',
      height: '100%',
      minheight: '100%',
      width: 550,
      minwidth: 500,
      tether: ['left', 'top', 'bottom'],
    }"
  >
    <div
      class="page page-index flex flex-col items-start p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded box-color__default--1"
    >
      <PageProse
        v-if="data"
        v-motion
        :initial="{
          y: -100,
          opacity: 0,
        }"
        :enter="{
          y: 0,
          opacity: 1,
        }"
        class="mb-6"
      >
        {{ data.text }}
      </PageProse>

      <div class="flex flex-row gap-2 text-3xl justify-center">
        <i class="i-logos:vue text-9xl" />
        <div
          class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy text-7xl"
        />
        <i
          class="i-mdi:alarm text-orange-400 text-6xl"
          un-hover="text-blue-400"
        />
        <i
          class="i-ph:airplane-duotone text-blue-600 text-4xl"
          un-dark="text-blue-500"
        />
        <i
          class="i-ph:anchor-simple text-gray-600 text-3xl"
          un-dark="text-gray-400"
        />
      </div>
    </div>
  </Winbox>
</template>
