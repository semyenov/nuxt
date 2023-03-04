<script setup lang="ts">
import type { PropType } from 'vue'

import type { IWindowInfo } from '@/store/winbox'

const props = defineProps({
  window: {
    type: Object as PropType<IWindowInfo>,
    required: true,
  },
})
</script>

<template>
  <Teleport v-if="props.window.show" :to="`#${props.window.id} .wb-content`">
    <pre class="w-full border-b p-6 text-xs box-color__default--2">{{
      props.window
    }}</pre>
    <slot name="default" />
  </Teleport>
</template>
