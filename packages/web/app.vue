<script setup lang="ts">
import { appName } from '~/constants'

import '../style/global.css'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NavBar />
    <NuxtPage />
  </NuxtLayout>
</template>
