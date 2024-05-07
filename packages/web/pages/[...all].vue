<script setup lang="ts">
import type { Data, ParseData } from '~/types'

const userStore = useUserStore()

const { lastUpdateTime } = storeToRefs(userStore)

const urlData = ref<Data>()

const host = import.meta.server ? 'localhost:3000' : location?.host ?? 'localhost:3000'

const { data } = useWebSocket(`ws://${host}/api/ws`, {
  onMessage: () => {
    const parsedData = JSON.parse(data.value) as ParseData

    urlData.value = {
      ...parsedData,
      data: JSON.parse(parsedData.data),
    }

    lastUpdateTime.value = urlData.value.created_at
  },
})
</script>

<template>
  <div v-if="urlData">
    <div flex="~ col gap-3" py4>
      <div relative flex class="group">
        <input
          v-model="urlData.url"
          placeholder="Loading Last Url..."
          border="~ base rounded-full"

          disabled w-full bg-transparent px10 py2 outline-none
          :class="data ? 'font-mono' : ''"
        >
        <div absolute bottom-0 left-0 top-0 flex="~ items-center justify-center" p4 op50>
          <div i-ph:link-simple-light />
        </div>

        <Copy absolute bottom-0 right-0 top-0 op0 transition-opacity group-hover:op100 flex="~ items-center justify-center" :text="urlData.url" />
      </div>

      <div flex="~ gap-2 items-center wrap" mb-2>
        <div>
          <div
            flex="~ gap-2 items-center wrap"
            border="~ sky/20 rounded-full" bg-sky:10 px3 py1
          >
            <div i-ph-info text-sky />
            {{ urlData.event }}
          </div>
        </div>
      </div>

      <Item :index="0" name="Source Data" :value="urlData.data" />

      <template v-for="(value, name, index) of urlData.data" :key="name">
        <Item
          :index="index + 1"
          :name
          :value
        />
      </template>
    </div>
  </div>
  <div v-else font-mono>
    ...Loading
  </div>
</template>
