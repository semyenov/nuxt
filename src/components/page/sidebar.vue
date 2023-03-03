<script setup lang="ts">
import {} from '@typed-router'

// helpers.route( {name: 'users-id', params: {id}})
</script>

<template>
  <div class="flex flex-col divide-y divide-dashed">
    <NuxtLink v-slot="{ isActive, navigate }" :custom="true" :to="{ name: '' }">
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
      :custom="true"
      :to="{ name: 'objects' }"
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
      :custom="true"
      :to="{ name: 'users' }"
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
      :custom="true"
      :to="{ name: 'test' }"
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
    <NuxtLink v-slot="{ isActive, navigate }" :custom="true" :to="{ path: '' }">
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
