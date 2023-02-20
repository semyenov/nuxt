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
    <div class="flex flex-col items-center p-6">
      <PageProse class="max-w-300">
        <h4 class="mt-0">Combobox</h4>
        <div
          class="flex flex-row items-center justify-start flex-wrap mb-6 gap-4"
        >
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

        <h4 class="mb-6 mt-6">Boxes</h4>
        <div
          v-for="color in uiColorVariants"
          :key="`box-${color}`"
          class="flex flex-row items-center justify-start flex-wrap mb-6 gap-4"
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
        <h4 class="mb-6 mt-6">Buttons</h4>
        <template
          v-for="rounded in uiRoundedVariants"
          :key="`rounded-${rounded}`"
        >
          <div
            v-for="(size, index) in uiSizeVariants"
            :key="`input-size__${size} input-rounded__${rounded}`"
            class="flex flex-row items-center justify-start flex-wrap mb-6"
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
            class="flex flex-row items-center justify-start flex-wrap mb-6"
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
        <h4 class="mb-6 mt-6">Inputs</h4>
        <template v-for="rounded in uiRoundedVariants">
          <div
            v-for="(size, index) in uiSizeVariants"
            :key="`btn-size__${size} btn-rounded__${rounded}`"
            class="flex flex-col items-center justify-start flex-wrap mb-6 w-full"
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
  </Winbox>
</template>
