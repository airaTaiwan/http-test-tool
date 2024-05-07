<script setup lang="ts">
defineProps<{
  text: string
}>()

const { copy, copied } = useClipboard({
  legacy: true,
})
</script>

<template>
  <div cursor-pointer p4 @click="copy(text)">
    <div i-ph:copy :class="copied ? 'text-green' : ''">
      <VDropdown
        placement="top"
        :distance="10"
        :triggers="[]"
        :shown="copied"
        :auto-hide="false"
      >
        <template #popper>
          <p m2 text-sm text-green font-mono>
            已複製！
          </p>
        </template>
      </VDropdown>
    </div>
  </div>
</template>
