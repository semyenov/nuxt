<script setup lang="ts">
import { notUndefined } from '@antfu/utils'
import { ObjectsComboboxItem } from '#components'
import type {
  UIColorVariants,
  UIRoundedVariants,
  UISizeVariants,
} from '@/types/ui'

const { t } = useI18n()

const uiSizeVariants: UISizeVariants[] = ['xs', 'sm', 'md', 'lg', 'xl']

const uiColorVariants: UIColorVariants[] = [
  'default',
  'primary',
  'secondary',
  'third',
  'fourth',
]

const uiRoundedVariants: UIRoundedVariants[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
]

const objectsStore = useObjectsStore()
const objectOptionsIds = await objectsStore.itemsGetter
const objectOptions = (
  await Promise.all(
    objectOptionsIds.value.map(
      async (item) => (await objectsStore.itemGetter(item)).value
    )
  )
).filter(notUndefined)

const input = ref<string | undefined>(undefined)
</script>

<template>
  <!-- <Winbox
    show
    teleport-id="teleport-layer--10"
    :params="{
      title: t('test.title'),
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
  > -->
  <div
    class="page page-test h-auto max-h-full flex flex-grow flex-col items-center gap-8 overflow-y-scroll p-6 scrollbar scrollbar-rounded"
  >
    <PageProse class="max-w-300">
      <h4 class="mt-0 font-medium text-default-500 dark:text-default-400">
        Combobox
      </h4>
      <div class="flex flex-row flex-wrap items-center justify-start gap-4">
        <Combobox
          v-for="color in uiColorVariants"
          :key="`combobox-${color}`"
          v-model="input"
          :color="color"
          :options="objectOptions"
          :data-component="ObjectsComboboxItem"
          class="w-full"
        />
      </div>

      <h4 class="font-medium text-default-500 dark:text-default-400">Boxes</h4>
      <div
        v-for="color in uiColorVariants"
        :key="`box-${color}`"
        class="mb-6 flex flex-row flex-wrap items-center justify-start gap-4"
      >
        <div
          v-for="variant in 9"
          :key="`box-${variant}`"
          class="h-26 w-26 flex flex-col items-center justify-center break-words border p-2"
          :class="`box-color__${color}--${variant}`"
        >
          <div class="-mt-6">{{ color }}</div>
          <div class="text-4xl font-bold">{{ variant }}</div>
        </div>
      </div>
      <h4 class="font-medium text-default-500 dark:text-default-400">
        Buttons
      </h4>
      <template
        v-for="rounded in uiRoundedVariants"
        :key="`rounded-${rounded}`"
      >
        <div
          v-for="(size, index) in uiSizeVariants"
          :key="`input-size__${size} input-rounded__${rounded}`"
          class="mb-6 flex flex-row flex-wrap items-center justify-start"
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
          class="mb-6 flex flex-row flex-wrap items-center justify-start"
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
      <h4 class="font-medium text-default-500 dark:text-default-400">Inputs</h4>
      <template v-for="rounded in uiRoundedVariants">
        <div
          v-for="(size, index) in uiSizeVariants"
          :key="`btn-size__${size} btn-rounded__${rounded}`"
          class="mb-6 w-full flex flex-col flex-wrap items-center justify-start"
          :class="`gap-${(index + 4) * 0.5}`"
        >
          <Input
            v-for="color in uiColorVariants"
            :key="`btn-${color}`"
            class="w-full flex flex-col"
            :size="size"
            :color="color"
            :rounded="rounded"
            :model-value="`${color.toUpperCase()}-${size.toUpperCase()}-${rounded.toLocaleUpperCase()}`"
          />
        </div>
      </template>
    </PageProse>
  </div>
  <!-- </Winbox> -->
</template>
