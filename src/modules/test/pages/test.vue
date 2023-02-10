<script setup lang="ts">
import { notUndefined } from '@antfu/utils'
import {
  uiColorVariants,
  uiRoundedVariants,
  uiSizeVariants,
} from '~~/unocss.config'

import { ObjectsComboboxItem } from '#components'

const objectsStore = useObjectsStore()
const objectOptionsIds = await objectsStore.itemsGetter
const objectOptions = (
  await Promise.all(
    objectOptionsIds.value.map(
      async (item) => (await objectsStore.itemGetter(item)).value
    )
  )
).filter(notUndefined)
console.log(objectOptions)
</script>

<template>
  <div class="page page-test">
    <div class="flex flex-col items-center w-full">
      <PageTitle>Test Page</PageTitle>
      <PageProse class="max-w-300">
        <h2 class="mb-8 mt-6">Combobox</h2>
        <div
          class="flex flex-row items-center justify-center flex-wrap mb-8 gap-4"
        >
          <Combobox
            :options="objectOptions"
            :data-component="ObjectsComboboxItem"
          />
        </div>

        <h2 class="mb-8 mt-6">Boxes</h2>
        <div
          v-for="color in uiColorVariants"
          :key="`box-${color}`"
          class="flex flex-row items-center justify-center flex-wrap mb-8 gap-4"
        >
          <div
            v-for="variant in 9"
            :key="`box-${variant}`"
            class="w-26 h-26 border p-2 break-words flex flex-col justify-center items-center"
            :class="`box-color__${color}--${variant}`"
          >
            <div class="-mt-6">{{ color }}</div>
            <div class="text-4xl font-bold">{{ variant }}</div>
          </div>
        </div>
        <h2 class="mb-8 mt-6">Buttons</h2>
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
          <div
            v-for="(size, index) in uiSizeVariants"
            :key="`input-size__${size} input-rounded__${rounded}`"
            class="flex flex-row items-center justify-center flex-wrap mb-8"
            :class="`gap-${(index + 4) * 0.5}`"
          >
            <Button
              v-for="color in uiColorVariants"
              :key="`input-${color}-outline`"
              outline
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
        <h2 class="mb-8 mt-6">Inputs</h2>
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
      </PageProse>
    </div>
  </div>
</template>
