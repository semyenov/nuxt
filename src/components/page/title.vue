<script setup lang="ts">
const now = useNow()
const mouseStore = useMouseStore()
</script>

<template>
  <div
    class="flex flex-col items-center justify-between border-b border-dashed w-full border-gray-400 rounded-3xl"
    un-dark="border-gray-700"
  >
    <div
      class="flex flex-row items-center justify-center text-gray-600 text-base font-semibold gap-1 mb-1"
      un-dark="text-gray-400"
    >
      {{ mouseStore.x }}
      <span class="text-xs text-gray-400" un-dark="text-gray-500">
        &Cross;
      </span>
      {{ mouseStore.y }}
    </div>

    <div class="flex flex-row items-start justify-end gap-2 mb-4 ml-8">
      <div
        class="text-6xl font-extrabold text-gray-800"
        un-dark="text-gray-200"
      >
        <slot />
      </div>
      <button
        class="i-carbon:sun dark:i-carbon:moon text-3xl text-gray-500 min-w-8"
        un-dark="text-gray-400"
        @click="toggleDark()"
      />
    </div>

    <div class="flex mb-6 text-gray-400" un-dark="text-gray-600">
      {{ now }}
    </div>

    <div
      class="flex flex-row flex-wrap items-center justify-center gap-3 mb-10"
    >
      <NuxtLink
        v-slot="{ isActive, navigate }"
        class="text-xs text-gray-500"
        un-dark="text-gray-300"
        to="/"
        custom
      >
        <Button
          :color="isActive ? 'blue' : 'gray'"
          size="md"
          rounded="xl"
          @click="navigate"
        >
          <i class="i-carbon:home inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Index Page</span
          >
        </Button>
      </NuxtLink>
      <NuxtLink
        v-slot="{ isActive, navigate }"
        class="text-xs text-gray-500"
        un-dark="text-gray-300"
        to="/data"
        custom
      >
        <Button
          :color="isActive ? 'blue' : 'gray'"
          size="md"
          rounded="xl"
          @click="navigate"
        >
          <i class="i-carbon:data-blob inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Data Page</span
          >
        </Button>
      </NuxtLink>
      <NuxtLink
        v-slot="{ isActive, navigate }"
        class="text-xs text-gray-500"
        un-dark="text-gray-300"
        to="/test"
        custom
      >
        <Button
          :color="isActive ? 'blue' : 'gray'"
          size="md"
          rounded="xl"
          @click="navigate"
        >
          <i class="i-carbon:text-scale inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Test Page</span
          >
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>
