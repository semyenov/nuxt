<script setup lang="ts">
const now = useNow()
const mouseStore = useMouseStore()
</script>

<template>
  <div
    class="component-page-title flex flex-col items-center justify-between border-b border-dashed w-full border-gray-400 rounded-b-3xl py-8 px-6"
    un-dark="border-gray-600"
  >
    <div
      class="flex flex-row items-center justify-center text-gray-600 text-base font-semibold gap-1 mb-1"
      un-dark="text-gray-400"
    >
      <span>{{ mouseStore.x }}</span>
      <span class="text-xs text-gray-400" un-dark="text-gray-500">
        &Cross;
      </span>
      <span>{{ mouseStore.y }}</span>
    </div>

    <div class="flex flex-row items-start justify-end gap-2 mb-4 ml-8">
      <div class="text-6xl font-extrabold text-gray-800" un-dark="text-gray-50">
        <slot />
      </div>
      <button
        class="i-carbon:sun text-3xl text-gray-500 min-w-8"
        un-dark="text-gray-400 i-carbon:moon"
        @click="toggleDark()"
      />
    </div>

    <div class="flex mb-6 text-gray-400" un-dark="text-gray-600">
      {{ now.toDateString() }}
    </div>

    <div class="flex flex-row flex-wrap items-center justify-center gap-2">
      <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'index' }" custom>
        <Button
          :color="isActive ? 'emerald' : 'zinc'"
          size="md"
          rounded="lg"
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
        :to="{ name: 'objects' }"
        custom
      >
        <Button
          :color="isActive ? 'blue' : 'zinc'"
          size="md"
          rounded="lg"
          @click="navigate"
        >
          <i class="i-carbon:data-blob inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Objects Page</span
          >
        </Button>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'users' }" custom>
        <Button
          :color="isActive ? 'blue' : 'zinc'"
          size="md"
          rounded="lg"
          @click="navigate"
        >
          <i class="i-carbon:user inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Users Page</span
          >
        </Button>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'test' }" custom>
        <Button
          :color="isActive ? 'rose' : 'zinc'"
          size="md"
          rounded="lg"
          @click="navigate"
        >
          <i class="i-carbon:text-scale inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Test Page</span
          >
        </Button>
      </NuxtLink>
      <NuxtLink
        v-slot="{ isActive, navigate }"
        :to="{ name: 'content-all' }"
        custom
      >
        <Button
          :color="isActive ? 'purple' : 'zinc'"
          size="md"
          rounded="lg"
          @click="navigate"
        >
          <i class="i-carbon:book inline-block h-6" />
          <span :class="isActive || 'hidden'" un-sm="inline-block"
            >Content Page</span
          >
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
/* .component-page-title {
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 10rem
  );
  box-shadow: 0px 20px 10px -10px rgba(191, 219, 254, 0.4);
}
.dark .component-page-title {
  background-image: linear-gradient(
    0deg,
    rgba(8, 10, 48, 0.4) 0%,
    rgba(0, 0, 0, 0) 10rem
  );
  box-shadow: 0px 20px 10px -10px rgba(10, 52, 190, 0.3);
} */
</style>
