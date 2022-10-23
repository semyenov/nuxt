<script setup lang="ts">
const now = useNow()
const mouseStore = useMouseStore()
</script>

<template>
  <div
    class="flex flex-col items-center justify-between border-b border-dashed w-full border-gray-400"
    un-dark="border-gray-700"
  >
    <div
      class="flex items-center justify-center text-gray-600 text-sm"
      un-dark="text-gray-400"
    >
      {{ mouseStore.x }}:{{ mouseStore.y }}
    </div>

    <div class="flex flex-row items-start gap-2 mb-6">
      <div
        class="text-6xl font-extrabold text-gray-800"
        un-dark="text-gray-200"
      >
        <slot />
      </div>
      <button
        class="i-carbon:sun dark:i-carbon:moon text-xl text-gray-500"
        un-dark="text-gray-400"
        @click="toggleDark()"
      />
    </div>

    <div class="flex mb-4 text-gray-400" un-dark="text-gray-600">
      {{ now }}
    </div>

    <div
      class="flex flex-row flex-wrap items-center justify-center gap-2 mb-10"
    >
      <NuxtLink
        v-slot="{ isActive, navigate }"
        class="text-xs text-gray-500"
        un-dark="text-gray-300"
        to="/"
        custom
      >
        <Button :color="isActive ? 'blue' : 'gray'" size="sm" @click="navigate">
          <span>Index Page</span>
        </Button>
      </NuxtLink>
      <NuxtLink
        v-slot="{ isActive, navigate }"
        class="text-xs text-gray-500"
        un-dark="text-gray-300"
        to="/data"
        custom
      >
        <Button :color="isActive ? 'blue' : 'gray'" size="sm" @click="navigate">
          <span>Data Page</span>
        </Button>
      </NuxtLink>
      <NuxtLink
        v-slot="{ isActive, navigate }"
        class="text-xs text-gray-500"
        un-dark="text-gray-300"
        to="/test"
        custom
      >
        <Button :color="isActive ? 'blue' : 'gray'" size="sm" @click="navigate">
          <span>Test Page</span>
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>
