<script setup lang="ts">
import type { Data } from '~/types'

const date = ref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'))

const { data } = await useFetch<Data[]>('/api/urlByDate', {
  query: { date: date.value },
})

const parsedData = computed(() => {
  return data.value?.map((item) => {
    return {
      ...item,
      data: JSON.parse(String(item.data)),
    }
  })
})
</script>

<template>
  <Suspense>
    <ClientOnly>
      <div flex="~ col gap-3" py4>
        <template v-for="item, index of parsedData" :key="item.id">
          <Item :index :name="item.url" :value="item.data" />
        </template>
      </div>
    </ClientOnly>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
