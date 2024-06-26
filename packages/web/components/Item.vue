<script setup lang="ts" generic="T">
defineProps<{
  index: number
  name: string
  value: T
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
    class="flat-config-item"
    :open="open"
    border="~ rounded-lg base" relative
    @toggle="open = $event.target.open"
  >
    <summary block>
      <div class="absolute right-[calc(100%+10px)] top-1.5" text-right font-mono op35 lt-lg:hidden>
        #{{ index }}
      </div>
      <div flex="~ gap-2 wrap items-center" cursor-pointer select-none bg-hover px2 py2 text-sm font-mono>
        <div class="[details[open]_&]:rotate-90" i-ph-caret-right text-base op50 transition />
        <ColorizedName v-if="name && index !== 0" :name="name" />
        <span v-else>{{ name }}</span>
      </div>
    </summary>

    <div v-if="hasShown" flex="~ col gap-4" relative of-auto px4 py3>
      <template v-if="typeof value === 'object'">
        <SourceData :code="value" />
        <Copy absolute bottom-0 right-0 top-0 op50 :text="JSON.stringify(value, null, 4)" />
      </template>
      <template v-else>
        <div flex="~ items-center gap-2" of-auto>
          原始欄位：
          <div>
            <span badge>{{ name }}</span>
          </div>
        </div>
        <div flex="~ items-center gap-2" of-auto>
          值：
          <div>
            <span badge>{{ value }}</span>
          </div>
        </div>
        <div>
          <NuxtImg
            v-if="value && containsImageOrImg(name) && isValidBase64(value)"
            placeholder
            :src="`data:image/jpeg;base64,${String(value)}`"
          />
        </div>
      </template>
    </div>
  </details>
</template>
