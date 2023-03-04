<script setup lang="ts">
import type { UIColorVariants } from '@/types/ui'

const props = defineProps({
  color: {
    type: String as PropType<UIColorVariants>,
    required: true,
  },
})
</script>

<template>
  <div class="test">
    <Card :color="props.color">
      <template #header>
        <slot name="header" />
      </template>
      <template #default>
        <slot />
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </Card>
  </div>
</template>
