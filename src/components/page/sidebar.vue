<script setup lang="ts">
const localeRoute = useLocaleRoute()
</script>

<template>
  <div class="flex flex-col divide-y divide-dashed">
    <NuxtLink
      v-slot="{ isActive, navigate }"
      no-rel
      :custom="true"
      :to="localeRoute({ name: 'index' })"
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
      no-rel
      :custom="true"
      :to="localeRoute({ name: 'objects' })"
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
      no-rel
      :custom="true"
      :to="localeRoute({ name: 'users' })"
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
      no-rel
      :custom="true"
      :to="localeRoute({ name: 'test' })"
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
      no-rel
      :custom="true"
      :to="localeRoute({ name: 'content-all', params: { all: [] } })"
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
