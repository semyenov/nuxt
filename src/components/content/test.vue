<template>
  <div class="test">
    <div class="mb-6">CONTENT TEST COMPONENT</div>
    <Card>
      <template #header>
        <slot name="header" />
      </template>
      <slot />
      <template #footer>
        <slot name="footer" />
      </template>
    </Card>
  </div>
</template>
