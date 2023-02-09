<template>
  <div
    class="flex flex-col fixed top-0 left-0 bottom-0 box-color__gray--2 border-r"
  >
    <!-- <Button
      v-for="i in 6"
      :key="`sidebar-item-${i}`"
      outline
      :border="false"
      rounded="none"
      color="secondary"
    >
      <i class="i-carbon:text-scale inline-block h-6" />
    </Button> -->
    <NuxtLink v-slot="{ isActive, navigate }" :to="{ name: 'index' }" custom>
      <Button
        :color="isActive ? 'primary' : 'fourth'"
        outline
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
        :color="isActive ? 'secondary' : 'third'"
        outline
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
        :color="isActive ? 'third' : 'secondary'"
        outline
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
        :color="isActive ? 'fourth' : 'primary'"
        size="md"
        outline
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
        :color="isActive ? 'primary' : 'fourth'"
        outline
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
