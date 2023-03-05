<script setup lang="ts">
const localeRoute = useLocaleRoute()
</script>

<template>
  <div class="flex flex-col divide-y divide-dashed">
    <NuxtLink
      v-slot="{ isActive, navigate }"
      :to="localeRoute({ name: 'index' })"
      custom
    >
      <Button
        color="primary"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:home inline-block h-6.5" />
      </Button>
    </NuxtLink>
    <NuxtLink
      v-slot="{ isActive, navigate }"
      :to="localeRoute({ name: 'objects' })"
      custom
    >
      <Button
        color="secondary"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:data-blob inline-block h-6.5" />
      </Button>
    </NuxtLink>
    <NuxtLink
      v-slot="{ isActive, navigate }"
      :to="localeRoute({ name: 'users' })"
      custom
    >
      <Button
        color="third"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:user inline-block h-6.5" />
      </Button>
    </NuxtLink>
    <NuxtLink
      v-slot="{ isActive, navigate }"
      :to="localeRoute({ name: 'test' })"
      custom
    >
      <Button
        color="fourth"
        size="md"
        :outline="!isActive"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:text-scale inline-block h-6.5" />
      </Button>
    </NuxtLink>
    <NuxtLink
      v-slot="{ isActive, navigate }"
      :to="localeRoute({ name: 'content-all', params: { all: [] } })"
      custom
    >
      <Button
        color="primary"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:book inline-block h-6.5" />
      </Button>
    </NuxtLink>
  </div>
</template>
