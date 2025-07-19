<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { tabs } = defineProps<{
  tabs: TabsItem[]
}>()
const emit = defineEmits(['currentTab'])

const activeTab = ref<TabsItem | null>(null)

const setCurrentTab = (item: TabsItem) => {
  activeTab.value = item
  emit('currentTab', item)
}

onMounted(() => {
  if (tabs && tabs.length > 0) {
    setCurrentTab(tabs[0])
  }
})

const isActiveTab = (item: TabsItem) => {
  return activeTab.value && activeTab.value.label === item.label
}
</script>

<template>
  <div class="flex flex-col w-full max-w-[500px]">
    <div class="flex items-center gap-4">
      <template v-for="(item, index) in tabs" :key="`tab-${index}-${item.label}`">
        <button 
          :class="[
            isActiveTab(item) ? 'bg-green-500 text-black' : 'border-transparent', 
            'flex items-center gap-2 text-sm p-2 transition-all font-semibold'
          ]" 
          @click="setCurrentTab(item)"
        >
          <template v-if="item.icon">
            <UIcon :name="item.icon" :size="20" />
          </template>
          <div :class="[ isActiveTab(item) ? 'block' : 'hidden', 'md:block']">
            {{ item.label }}
          </div>
        </button>
      </template>
    </div>
  </div>
</template>