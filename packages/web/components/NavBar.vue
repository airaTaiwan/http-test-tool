<script setup lang="ts">
const color = useColorMode()

const userStore = useUserStore()

const { lastUpdateTime } = storeToRefs(userStore)

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Badge text-3xl font-200 />
  <div flex="~ gap-1 items-center wrap" text-sm>
    <span op50>Last Update</span>
    <span op50>{{ lastUpdateTime ? lastUpdateTime : '...' }}</span>
  </div>
  <div flex="~ gap-3 items-center wrap" py4>
    <NuxtLink
      to="/"
      px3 py1 text-base btn-action
      active-class="btn-action-active"
    >
      <div i-ph-stack-duotone flex-none />
      Configs
    </NuxtLink>
    <button
      title="Toggle Dark Mode"
      i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone ml1 text-xl op50 hover:op75
      @click="toggleDark()"
    />
    <NuxtLink
      href="https://github.com/airaTaiwan/http-test-tool" target="_blank"
      i-carbon-logo-github text-lg op50 hover:op75
    />
  </div>
</template>
