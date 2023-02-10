<template>
  <div
    class="flex flex-col fixed top-0 left-0 bottom-0 box-color__default--1 border-r"
  >
    <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'index' }" custom>
      <Button
        color="primary"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:home inline-block h-6" />
      </Button>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'objects' }" custom>
      <Button
        color="secondary"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:data-blob inline-block h-6" />
      </Button>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'users' }" custom>
      <Button
        color="third"
        :outline="!isActive"
        size="md"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:user inline-block h-6" />
      </Button>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'test' }" custom>
      <Button
        color="fourth"
        size="md"
        :outline="!isActive"
        rounded="none"
        :border="false"
        @click="navigate"
      >
        <i class="i-carbon:text-scale inline-block h-6" />
      </Button>
    </NuxtLink>
    <NuxtLink
      v-slot="{ isActive, navigate }"
      :to="{ name: 'content-all' }"
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
        <i class="i-carbon:book inline-block h-6" />
      </Button>
    </NuxtLink>
  </div>
</template>
