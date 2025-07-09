<script setup lang="ts">
const name = ref<string>("")
const result = ref<string>()
const pending = ref<boolean>(false)

const sendRequest = async () => {
  pending.value = true
  const { data, pending: isLoading } = await useFetch('/api/ai', {
    method: "POST",
    body: {
      name: name.value,
      lang: navigator.language,
      type: 'visit'
    },
 })
 console.log(isLoading.value)
 pending.value = isLoading.value
 result.value = data.value!
}

</script>

<template>
  <header class="flex items-center justify-between p-5">
    <h1 class="text-emerald-400 text-xl font-mono">first-time.ai</h1>
    <div class="flex items-center gap-2">
      <UButton variant="subtle" class="h-8">
        <UIcon name="fa:github" />
        View on Github
      </UButton>
    </div>
  </header>
  <section class="mt-[150px] flex flex-col items-center justify-center gap-8 px-5 mb-4">
    <div class="flex flex-col gap-2 items-center">
      <h1 class="text-emerald-400 text-4xl font-mono">first-time.ai</h1>
      <img src="/assets/border.svg" class="w-[300px]" />
    </div>
    <p class="text-center">🥷 An AI Agent for learn how can you do in your first time. You can learn places you visit, an item you will use, a job you have to done and more!</p>
    <div>
      <button :class="[{'bg-emerald-950 border-emerald-800 hover:border-emerald-700': name.length > 2 }, 'flex items-center flex-wrap gap-2 text-sm py-2 px-4 pr-5 border border-emerald-900 rounded-lg transition-colors !cursor-default']">
        <UIcon name="ix:ai" size="20" class="text-emerald-500 mr-2" />
        I am gonna visit <input type="text" v-model="name" class="border-b border-dashed border-b-emerald-500 w-[100px] outline-none p-0 text-sm text-center focus-within:border-b-white"> first time.
      </button>
    </div>
    <div class="flex flex-col">
      <div>
        <template v-if="pending">
          <div class="animate-spin"></div>
        </template>
        <MarkdownRenderer :markdown="result || ''" />
      </div>
      <div class="flex items-center gap-4">
        <UButton @click="sendRequest" :loading="pending" :disabled="name.length <= 2" class="disabled:!cursor-none disabled:opacity-60">
          <template v-if="name.length <= 2">
            Fill The Area
          </template>
          <template v-else-if="pending">
            Response waiting...
          </template>
          <template v-else>
            Lets Start
          </template>
        </UButton>
      </div>
    </div>
  </section>
</template>