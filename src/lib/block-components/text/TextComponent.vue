<script setup lang="ts">
import BasePreview from "../BasePreview.vue";
import RichTextEditor from "../../editors/TextEditor/RichTextEditor.vue";
import { TextBlock } from "../../utils/blocks/TextBlock.ts";

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
      <div :class="blockInfo.options.cssClasses" :style="[blockInfo.options.styles]">
        <RichTextEditor v-model="blockInfo.options.text" :font-size="blockInfo.options.fontSize" />
      </div>
    </template>
    <template v-else>
      <div :class="blockInfo.options.cssClasses"
        :style="[blockInfo.options.styles, { fontSize: `${blockInfo.options.fontSize}rem` }]"
        v-html="blockInfo.options.text"></div>
    </template>
  </BasePreview>
</template>