<script setup lang="ts">
const props = defineProps({
  odd: {
    type: Boolean,
    default: false,
  },
})
const slots = useSlots()
</script>

<template>
  <div
    class="divide-y border rounded-lg flex flex-col divide-gray-200 bg-opacity-80 border-gray-300 shadow-lg text-left min-w-75 transition-shadow shadow-gray-200 relative dark:divide-gray-700 dark:border-gray-700 dark:shadow-gray-800"
    :class="props.odd ? 'odd' : 'even'"
  >
    <div
      v-if="slots.header"
      class="flex flex-row flex-grow font-medium bg-sky-700 text-base leading-snug py-2 px-4 text-gray-50 gap-4 justify-between items-center dark:border-gray-700 dark:text-gray-400"
    >
      <slot name="header" />
      <slot name="menu" />
    </div>
    <div
      v-if="slots.panel"
      class="border-b flex flex-row bg-light-400 border-gray-300 py-2 px-4"
    >
      <slot name="panel" />
    </div>
    <div
      class="flex flex-col bg-gray-50 text-sm text-gray-800 items-stretch break-normal py-2 px-4 dark:text-gray-500"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="rounded-b-md flex-grow flex flex-row w-full p-4 text-gray-500 gap-4 dark:text-gray-400"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<!-- <style lang="postcss">
.card {
  @apply divide-y border rounded-lg flex flex-col divide-gray-200
    bg-opacity-80 border-gray-300 shadow-lg text-left
    min-w-75 transition-shadow  shadow-gray-200 relative
    dark:divide-gray-700 dark:border-gray-700 dark:shadow-gray-800;

  &.odd {
    @apply bg-gray-100 bg-opacity-85
      dark:bg-gray-900 dark:bg-opacity-85;
  }
  &.even {
    @apply bg-white bg-opacity-75
      dark:bg-gray-800 dark:bg-opacity-75;
  }

  &__header {
    @apply flex flex-row flex-grow font-medium bg-sky-700 text-base leading-snug py-2
      px-4 text-gray-50
      gap-4 justify-between items-center
    dark:border-gray-700 dark:text-gray-400;
  }
  &.disabled {
    .card__header {
      @apply cursor-default bg-light-500 text-gray-400;
    }
  }
  &__panel {
    @apply border-b flex flex-row bg-light-400 border-gray-300 py-2 px-4;
  }
  &__body {
    @apply flex flex-col bg-gray-50 text-sm text-gray-800
     items-stretch break-normal dark:text-gray-500;
  }

  &__footer {
    @apply rounded-b-md flex-grow flex flex-row w-full p-4 text-gray-500
      gap-4 dark:text-gray-400;
    & > * {
      @apply flex-grow;
    }
  }
  & > div {
    @apply first-of-type:rounded-t-md last-of-type:rounded-b-md;
  }
  &:hover {
    @apply shadow-2xl;
  }
  &.disabled {
    .card__body {
      @apply text-gray-300;
    }
  }
  &.active {
    .card__header {
      @apply bg-emerald-700;
    }
  }
}
</style> -->
