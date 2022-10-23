<script setup lang="ts">
import { unoColorVariants, unoRoundedVariants, unoSizeVariants } from '@/uno'
</script>

<template>
  <div class="page-test flex flex-col items-center gap-8 p-10 w-full max-w-200">
    <PageTitle>Test Page</PageTitle>
    <PageProse>
      <template v-for="rounded in unoRoundedVariants">
        <div
          v-for="(size, index) in unoSizeVariants"
          :key="`btn-size__${size} btn-rounded__${rounded}`"
          class="flex flex-row items-center justify-center flex-wrap mb-8"
          :class="`gap-${(index + 4) * 0.5}`"
        >
          <Button
            v-for="color in unoColorVariants"
            :key="`btn-${color}`"
            :size="size"
            :color="color"
            :rounded="rounded"
          >
            <i class="i-carbon:download inline-block" />
            <span>{{
              `${color.toUpperCase()}-${size.toUpperCase()}-${rounded.toLocaleUpperCase()}`
            }}</span>
          </Button>
        </div>
      </template>
    </PageProse>
  </div>
</template>
