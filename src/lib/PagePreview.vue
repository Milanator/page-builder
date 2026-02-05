<script setup lang="ts">
import { Block } from "@/lib/utils/types"
import { previewComponentMap } from "./utils/registry.ts";

interface Props {
  renderList: Block[]
}

defineProps<Props>()
</script>
<template>
  <div v-for="(block, index) of renderList" :key="`r_item_${index}`">
    <component :is="previewComponentMap[block.name]" :blockInfo="block" />
  </div>
</template>