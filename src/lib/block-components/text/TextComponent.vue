<script setup lang="ts">
import BasePreview from "@/lib/block-components/BasePreview.vue";
import RichTextEditor from "@/lib/editors/TextEditor/RichTextEditor.vue";
import { TextBlock } from "@/lib/utils/blocks/TextBlock.ts";
import { marginStyles } from "@/lib/utils/style.ts";

interface Props {
  blockInfo: TextBlock
  inEditor?: boolean
}

interface Emits {
  (event: 'onTextChange', value: string | undefined): any,
}

defineProps<Props>()

const emit = defineEmits<Emits>()
</script>
<template>
  <BasePreview :inEditor="inEditor" :background-image="blockInfo.options.backgroundImage">
    <template v-if="inEditor">
      <div :class="blockInfo.options.cssClasses" :style="[
        blockInfo.options.styles,
        marginStyles(blockInfo.options)
      ]">
        <RichTextEditor v-model="blockInfo.options.text" :styles="{
          fontSize: blockInfo.options.fontSize,
          letterSpacing: blockInfo.options.letterSpacing,
          textColor: blockInfo.options.textColor,
          lineHeight: blockInfo.options.lineHeight,
        }" @onTextChange="emit('onTextChange', $event)" />
      </div>
    </template>
    <template v-else>
      <div :class="blockInfo.options.cssClasses" :style="[
        blockInfo.options.styles,
        marginStyles(blockInfo.options),
        {
          fontSize: blockInfo.options.fontSize ? `${blockInfo.options.fontSize}rem` : undefined,
          lineHeight: blockInfo.options.lineHeight,
          letterSpacing: blockInfo.options.letterSpacing ? `${blockInfo.options.letterSpacing}px` : undefined,
        }
      ]" v-html="blockInfo.options.text"></div>
    </template>
  </BasePreview>
</template>