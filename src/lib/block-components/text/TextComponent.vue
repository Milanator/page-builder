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

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const getPreviewStyles = () => ([
  props.blockInfo.options.styles,
  marginStyles(props.blockInfo.options),
  {
    fontSize: props.blockInfo.options.fontSize ? `${props.blockInfo.options.fontSize}rem` : undefined,
    color: props.blockInfo.options.textColor,
    lineHeight: props.blockInfo.options.lineHeight,
    textAlign: props.blockInfo.options?.textAlign ?? 'left',
    letterSpacing: props.blockInfo.options.letterSpacing ? `${props.blockInfo.options.letterSpacing}px` : undefined,
  }
])
</script>
<template>
  <BasePreview :inEditor="inEditor">
    <template v-if="inEditor">
      <div :class="blockInfo.options.cssClasses" :style="[
        blockInfo.options.styles,
        marginStyles(blockInfo.options)
      ]">
        <RichTextEditor v-model="blockInfo.options.text" :options="blockInfo.options"
          @onTextChange="emit('onTextChange', $event)" />
      </div>
    </template>
    <template v-else>
      <div :class="blockInfo.options.cssClasses" :style="getPreviewStyles()" v-html="blockInfo.options.text"></div>
    </template>
  </BasePreview>
</template>