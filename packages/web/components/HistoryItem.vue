<script setup lang="ts" generic="T">
import type { Data } from '~/types'

defineProps<Data & {
  index: number
  noColor?: boolean
}>()

const open = defineModel('open', {
  default: false,
})

const hasShown = ref(open.value)
if (!hasShown.value) {
  const stop = watchEffect(() => {
    if (open.value) {
      hasShown.value = true
      stop()
    }
  })
}
</script>

<template>
  <details
    :open
    border="~ rounded-lg base" relative
    @toggle="open = $event.target.open"
  >
    <summary block>
      <div class="absolute right-[calc(100%+10px)] top-1.5" text-right font-mono op35 lt-lg:hidden>
        #{{ index }}
      </div>
      <div flex="~ gap-2 wrap items-center" cursor-pointer select-none bg-hover px2 py2 text-sm font-mono>
        <div class="[details[open]_&]:rotate-90" i-carbon-chevron-right text-base op50 transition />
        <div flex="~ col items-center auto gap-3 md:row">
          <div flex="~ auto">
            <ColorizedName :name="url" />
          </div>
          <div flex="~ gap-2 items-center wrap">
            <SummarizeItem
              icon="i-carbon-information"
              color="text-sky"
              :title="event"
            />
            <SummarizeItem
              icon="i-carbon-data-1"
              color="text-sky"
              title="Param"
              :number="Object.keys(data).length"
            />
          </div>
        </div>
        <!-- <span text="gray op60">{{ createAt }}</span> -->
      </div>
    </summary>

    <div v-if="hasShown" flex="~ col gap-4" relative of-auto px4 py3>
      <SourceData :code="data" />
      <Copy absolute bottom-0 right-0 top-0 op50 :text="JSON.stringify(data, null, 4)" />
    </div>
  </details>
</template>
