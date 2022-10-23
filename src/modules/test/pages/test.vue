<template>
  <div class="flex flex-col items-center gap-6 p-10">
    <PageTitle>Test Page</PageTitle>
    <NuxtLink class="text-xs text-gray-500" un-dark="text-gray-300" to="/">
      <i class="i-carbon:arrow-left inline-block relative top-0.5 mr-1" />
      <span>Index Page</span>
    </NuxtLink>
    <PageProse>
      <div
        v-for="(size, index) in ['xs', 'sm', 'base', 'lg', 'xl']"
        :key="`btn-${size}`"
        class="flex flex-row items-center justify-center flex-wrap mb-8"
        :class="`gap-${index + 2}`"
      >
        <Button
          v-for="color in [
            'rose',
            'pink',
            'fuchsia',
            'purple',
            'violet',
            'indigo',
            'blue',
            'sky',
            'cyan',
            'teal',
            'emerald',
            'green',
            'lime',
            'yellow',
            'amber',
            'orange',
            'red',
            'gray',
            'slate',
            'zinc',
            'neutral',
            'stone',
          ]"
          :key="`btn-${color}`"
          :size="size"
          :color="color"
        >
          <i class="i-carbon:download inline-block" />
          <span>{{ `${size.toUpperCase()}-${color.toUpperCase()}` }}</span>
        </Button>
      </div>
    </PageProse>
  </div>
</template>
