<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const name = ref<string>("")
const result = ref<string>("")
const pending = ref<boolean>(false)
const submitted = ref<boolean>(false)

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

</script>

<template>
  <Header />
  <section class="mt-[100px] md:mt-[150px] flex flex-col items-center justify-center gap-8 px-5 mb-4">
    <Motion :animate="submitted ? { top: '-200px' } : { opacity: 1 }" class="flex flex-col gap-2 items-center relative">
      <template v-if="submitted">
        <h1 class="text-emerald-400 text-3xl font-mono" v-motion="{
          initial: { opacity: 0 },
          enter: { opacity: 1 },
        }">{{ name }}</h1>
      </template>
      <template v-else>
        <h1 class="text-emerald-400 text-4xl font-mono">first-time.ai</h1>
      </template>
      <img src="/assets/border.svg" class="w-[300px]" />
    </Motion>
    <Motion :animate="submitted ? { opacity: 0, top: '-50px' } : { opacity: 1 }" class="text-center relative">🥷 Yapay Zeka desteğiyle ilk kez yapacağın bir şeyi nasıl yapabileceğini öğren <br> Seyehat ve Gezi, Kullanım Rehberi, Nasıl Yapılır? ve dahası...</Motion>
    <Motion :animate="submitted ? { top: '90%', opacity: 1 } : { opacity: 1 }" :class="[{'mt-0' : submitted}, 'fixed mt-10 md:mt-0 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50']">
      <UTabs :items="items" class="w-auto md:w-full" variant="link">
        <template #content="{ item }">
          <div
          class="relative p-1 mt-4 rounded-2xl border-2 border-emerald-500 w-full h-[60px] transition-all focus-within:p-0">
            <div class="flex items-center gap-2 p-1 pl-3 rounded-xl bg-white text-black h-full">
              <UIcon name="ix:ai" size="24" class="text-emerald-500 mr-2" />
              <input type="text" v-model="name" :placeholder="item.placeholder" class="flex-1 w-full outline-none p-0 text-sm focus-within:border-b-black">
              <UButton @click="sendRequest" :disabled="name.length <= 2 || pending" class="flex items-center justify-center rounded-3xl h-[40px] w-[40px]">
                <template v-if="pending">
                  <IconLoaderCircle :size="18" class="animate-spin" />
                </template>
                <template v-else>
                  <IconSend :size="18" />
                </template>
              </UButton>
            </div>
          </div>
        </template>
      </UTabs>
    </Motion>
  </section>
  <div class="fixed top-[130px] h-[70vh] left-1/2 -translate-x-1/2 overflow-y-auto w-full md:w-[998px] p-4">
    <div class="grid gap-2" v-if="pending">
      <USkeleton class="h-4 w-[350px]" />
      <USkeleton class="h-4 w-[300px]" />
      <USkeleton class="h-4 w-[250px]" />
    </div>
    <MarkdownRenderer v-if="submitted" :markdown="result" />
  </div>
  <div class="fixed -bottom-70 left-1/2 w-100 h-90 bg-green-500 -translate-x-1/2 rounded-full blur-[150px]"></div>
</template>