<script setup lang="ts">

</script>

<template>
  <header class="flex items-center justify-between p-5">
    <h1 class="text-green-400 text-xl font-mono">first-time.ai</h1>
    <div class="flex items-center gap-2">
      <UButton variant="subtle" class="h-8">
        <UIcon name="fa:github" />
      </UButton>
      <UButton class="h-8" :disabled="true">
        <!-- <UIcon name="fa:google" /> -->
        <IconLock :size="14"  />
        Giriş Yap
      </UButton>
    </div>
  </header>
</template>