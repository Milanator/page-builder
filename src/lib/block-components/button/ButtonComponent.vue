<script setup lang="ts">
import { marginStyles } from "@/lib/utils/style.ts";
import { ButtonBlock } from "@/lib/utils/blocks/ButtonBlock.ts";
import BasePreview from "../BasePreview.vue";

interface Props {
  blockInfo: ButtonBlock;
  inEditor?: boolean
}

const props = defineProps<Props>()

const onClick = ($event: Event) => {
  $event.preventDefault();
  if (props.inEditor) {
    return
  }
  if (props.blockInfo.options.buttonAction.type === 'external_link') {
    window.open(props.blockInfo.options.buttonAction.url)
  } else if (props.blockInfo.options.buttonAction.type === 'internal_link') {
    window.open(props.blockInfo.options.buttonAction.url)
  }
}
</script>
<template>
  <BasePreview :inEditor="inEditor">
    <div :style="[{ 'text-align': blockInfo.options.buttonAlign }, marginStyles(blockInfo.options)]">
      <button @click="onClick" :class="blockInfo.options.styleClass" :style="blockInfo.options.styles">
        {{ blockInfo.options.text }}
      </button>
    </div>
  </BasePreview>
</template>