<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const items: TabsItem[] = [
  {
    label: 'Seyehat ve Gezi',
    icon: 'i-lucide-tent-tree',
    placeholder: 'Nereyi ziyaret etmeyi düşünüyorsunuz?'
  },
  {
    label: 'Kullanım Rehberi',
    icon: 'i-lucide-book-open',
    placeholder: 'Neyi ilk kez kullanmaya çalışıyorsunuz?'
  },
  {
    label: 'Nasıl Yapılır?',
    icon: 'i-lucide-message-circle-question-mark',
    placeholder: 'Neyin nasıl yapılacağını merak ediyorsunuz?'
  }
]

const name = ref<string>("")
const result = ref<string>("")
const pending = ref<boolean>(false)
const submitted = ref<boolean>(false)
const currentTab = ref<TabsItem>(items[0])

const setCurrentTab = (tab: TabsItem) => currentTab.value = tab 

const sendRequest = async () => {
  if (!submitted.value) {
    submitted.value = true
  }
  pending.value = true
  const { data, pending: isLoading } = await useFetch('/api/ai', {
    method: "POST",
    body: {
      name: name.value,
      lang: navigator.language,
      type: 'visit'
    },
 })
 pending.value = isLoading.value
 result.value = data.value!
}

</script>

<template>
  <Header />
  <section class="mt-[100px] md:mt-[150px] flex flex-col items-center justify-center gap-8 px-5 mb-4 relative z-50">
    <Motion :animate="submitted ? { top: '-50px', opacity: 0 } : { opacity: 1 }" class="flex flex-col gap-2 items-center relative">
      <h1 class="text-emerald-400 text-4xl font-mono">first-time.ai</h1>
      <img src="/assets/border.svg" class="w-[300px]" />
    </Motion>
    <template v-if="submitted">
      <Motion :initial="{ opacity: 0, top: '-30px' }" :animate="{ opacity: 1, top: '0px' }" class="bg-[var(--ui-bg)] w-full mx-auto max-w-[600px] px-5 md:px-0 py-7 fixed top-10">
        <h1 class="text-2xl text-emerald-400">{{ name }}</h1>
      </Motion>
    </template>
    <Motion :animate="submitted ? { opacity: 0, top: '-50px' } : { opacity: 1 }" class="text-center relative">🥷 Yapay Zeka desteğiyle ilk kez yapacağın bir şeyi nasıl yapabileceğini öğren <br> Seyehat ve Gezi, Kullanım Rehberi, Nasıl Yapılır? ve dahası...</Motion>
    <Motion :animate="submitted ? { bottom: '30px', opacity: 1 } : { opacity: 1 }" :initial="submitted ? { position: 'fixed', bottom: '30px', opacity: 0 } : { opacity: 1 }" :class="[{'!w-[calc(100%-40px)]': submitted}, 'w-full max-w-[600px] rounded-xl p-2 border bg-white *:text-black']">
      <div class="flex items-center gap-2 mb-2 rounded-xl bg-white text-black h-full">
        <UIcon name="ix:ai" size="24" class="text-emerald-500" />
        <input type="text" v-model="name" :placeholder="currentTab.placeholder" class="flex-1 w-full outline-none p-0 text-sm focus-within:border-b-black">
        <UButton @click="sendRequest" :disabled="name.length <= 2 || pending" class="flex items-center justify-center rounded-3xl h-[40px] w-[40px]">
          <template v-if="pending">
            <IconLoaderCircle :size="18" class="animate-spin" />
          </template>
          <template v-else>
            <IconSend :size="18" />
          </template>
        </UButton>
      </div>
      <Tab :tabs="items" @current-tab="setCurrentTab" />
    </Motion>
  </section>
  <div class="py-5 w-full max-w-[600px] mx-auto -mt-[310px] mb-[150px] md:px-1">
    <div class="grid gap-2 px-5 md:px-0" v-if="pending">
      <USkeleton class="h-4 w-[350px]" />
      <USkeleton class="h-4 w-[300px]" />
      <USkeleton class="h-4 w-[250px]" />
    </div>
    <MarkdownRenderer v-if="submitted" :markdown="result" />
  </div>
  <div class="fixed -bottom-70 left-1/2 w-100 h-90 bg-green-500 -translate-x-1/2 rounded-full blur-[150px]"></div>
</template>