<script setup>
const name = ref("")
const result = ref(null)
const pending = ref(false)
const sendRequest = async () => {
  const { data, pending: isLoading } = await useFetch('/api/ai', {
    method: "POST",
    body: {
      name: name.value
    },
 })
 pending.value = isLoading.value
 result.value = data.value
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
      <button class="flex items-center flex-wrap gap-2 text-sm py-2 px-4 pr-5 border border-emerald-900 rounded-lg">
        <UIcon name="ix:ai" size="20" class="text-emerald-500 mr-2" />
        I am gonna visit <input type="text" v-model="name" class="border-b border-dashed border-b-emerald-500 w-[100px] outline-none p-0 text-sm text-center focus-within:border-b-white"> first time.
      </button>
    </div>
    <div>
      {{ pending ? 'Loading...' : null }}
      {{ result }}
    </div>
    <div class="flex items-center gap-4">
      <UButton variant="subtle">
        Learn More
        <UIcon name="famicons:chevron-down-outline" />
      </UButton>
      <UButton @click="sendRequest" :disabled="isLoading">
        <template v-if="isLoading">
          <UIcon name="svg-spinners:180-ring-with-bg" class="mr-2" />
          Wait a second...
        </template>
        <template v-else>
          Getting Started
        </template>
      </UButton>
    </div>
  </section>
</template>