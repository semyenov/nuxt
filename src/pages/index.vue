<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Page Title',
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { x, y } = useMouse()
</script>

<template>
  <div class="flex gap-1">
    <div class="flex flex-col text-gray-400 text-xs">{{ x }}:{{ y }}</div>
    <div class="flex flex-col custom-shortcut">Index Page</div>
    <div class="flex flex-row gap-1 text-3xl">
      <div
        class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy"
      />
      <i class="i-mdi:alarm text-orange-400 hover:text-blue-400" />
      <i class="i-logos:vue text-5xl" />
      <i class="i-ph:anchor-simple" />
      <button class="i-carbon:sun dark:i-carbon:moon" @click="toggleDark()" />
    </div>
    <NuxtLink
      class="text-xs mt-4 text-gray-500 dark:text-gray-300"
      :to="{ path: '/about' }"
    >
      About Page
      <i class="i-carbon:arrow-right inline-block relative top-0.5"></i>
    </NuxtLink>
  </div>
</template>
