<script setup lang="ts">
defineProps<{
  icon: string
  number?: number
  color: string
  title: string
}>()
</script>

<template>
  <div flex="~ items-center">
    <VDropdown
      placement="top"
      :distance="10"
      :triggers="['hover', 'focus']"
      :auto-hide="true"
    >
      <div
        flex="~ gap-2"
        :class="color"
      >
        <div :class="icon" />
        <span v-if="number" min-w-6 :class="`text-${color}`">{{ number || '' }}</span>
      </div>
      <template #popper>
        <p m2 text-sm text-green font-mono>
          {{ number ?? '' }} {{ title }}
        </p>
      </template>
    </VDropdown>
    <div v-if="!number" mr-6 />
  </div>
</template>
