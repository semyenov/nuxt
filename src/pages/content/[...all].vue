<script setup lang="ts">
const { t } = useI18n()

const route = useRoute()
const contentPath = route.path.replace(/^\/content/s, '/')
</script>

<template>
  <Winbox
    show
    :params="{
      title: t('content.title'),
      class: ['simple', 'border-l-none', 'wb-left', 'no-move', 'no-close'],
      index: 10,
      border: 0,
      top: 0,
      left: '45px',
      bottom: 0,
      right: '50%',
      height: '100%',
      minheight: '100%',
      width: '550px',
      minwidth: '500px',
      x: '45px',
      y: 'center',
    }"
  >
    <div
      class="flex flex-col items-start p-6 w-full h-full overflow-y-scroll max-h-screen scrollbar scrollbar-rounded box-color__default--2"
    >
      <ContentDoc :path="contentPath" />
    </div>
  </Winbox>
</template>
