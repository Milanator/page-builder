<script setup lang="ts">
import { Block } from "@/lib/utils/types"
import { previewComponentMap } from "@/lib/utils/registry";

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