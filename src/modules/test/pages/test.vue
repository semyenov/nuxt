<script setup lang="ts">
import { unoColors, unoSizes } from '@/uno'
</script>

<template>
  <div class="page-test flex flex-col items-center gap-8 p-10 w-full max-w-200">
    <PageTitle>Test Page</PageTitle>
    <PageProse>
      <div
        v-for="(size, index) in unoSizes"
        :key="`btn-${size}`"
        class="flex flex-row items-center justify-center flex-wrap mb-8"
        :class="`gap-${(index + 4) * 0.5}`"
      >
        <Button
          v-for="color in unoColors"
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
