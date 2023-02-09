<script setup lang="ts">
import { uiColorVariants, uiRoundedVariants, uiSizeVariants } from '~~/uno'
</script>

<template>
  <div class="page page-test">
    <div class="flex flex-col items-center gap-8 p-8 pt-0 w-full max-w-250">
      <PageTitle>Test Page</PageTitle>
      <div>
        <div
          v-for="color in uiColorVariants"
          :key="`box-${color}`"
          class="flex flex-row items-center justify-center flex-wrap mb-8 gap-4"
        >
          <div
            v-for="variant in 8"
            :key="`box-${variant}`"
            class="w-20 h-20 border"
            :class="`box-color__${color}--${variant}`"
          >
            HELLO WORLD
          </div>
        </div>
        <template
          v-for="rounded in uiRoundedVariants"
          :key="`rounded-${rounded}`"
        >
          <div
            v-for="(size, index) in uiSizeVariants"
            :key="`input-size__${size} input-rounded__${rounded}`"
            class="flex flex-row items-center justify-center flex-wrap mb-8"
            :class="`gap-${(index + 4) * 0.5}`"
          >
            <Button
              v-for="color in uiColorVariants"
              :key="`input-${color}`"
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
        <template v-for="rounded in uiRoundedVariants">
          <div
            v-for="(size, index) in uiSizeVariants"
            :key="`btn-size__${size} btn-rounded__${rounded}`"
            class="flex flex-col items-center justify-center flex-wrap mb-8 w-full"
            :class="`gap-${(index + 4) * 0.5}`"
          >
            <Input
              v-for="color in uiColorVariants"
              :key="`btn-${color}`"
              class="flex flex-col w-full"
              :size="size"
              :color="color"
              :rounded="rounded"
              :model-value="`${color.toUpperCase()}-${size.toUpperCase()}-${rounded.toLocaleUpperCase()}`"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
