<script setup lang="ts">
import BasePreview from "@/lib/block-components/BasePreview.vue";
import RichTextEditor from "@/lib/editors/TextEditor/RichTextEditor.vue";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { marginStyles } from "@/lib/utils/style.ts";

interface Props {
  blockInfo: TextBlock
  inEditor?: boolean
}

defineProps<Props>()
</script>
<template>
  <BasePreview :inEditor="inEditor" :has-container="blockInfo.options.hasContainer"
    :background-image="blockInfo.options.backgroundImage">
    <template v-if="inEditor">
      <div :class="blockInfo.options.cssClasses" :style="[blockInfo.options.styles, marginStyles(blockInfo.options)]">
        <RichTextEditor v-model="blockInfo.options.text" :styles="{
          fontSize: `${blockInfo.options.fontSize}rem`,
          lineHeight: blockInfo.options.lineHeight
        }" />
      </div>
    </template>
    <template v-else>
      <div :class="blockInfo.options.cssClasses"
        :style="[blockInfo.options.styles, { fontSize: `${blockInfo.options.fontSize}rem`, lineHeight: blockInfo.options.lineHeight }]"
        v-html="blockInfo.options.text"></div>
    </template>
  </BasePreview>
</template>