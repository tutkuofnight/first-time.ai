<script setup lang="ts">
import { marked } from "marked"
const { markdown } = defineProps<{
  markdown: string
}>()
</script>

<template v-if="markdown">
  <div v-html="marked.parse(markdown)" class="md"></div>
</template>

<style scoped>

</style>