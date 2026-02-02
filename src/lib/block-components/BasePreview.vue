<script setup lang="ts">
interface Props {
  inEditor?: boolean
  backgroundColor?: string | null
  backgroundImage?: string | null
}

withDefaults(defineProps<Props>(), {
  inEditor: true,
  backgroundImage: null,
  backgroundColor: null
})

</script>

<template>
  <div class="base-preview-item" :class="{ 'editor': inEditor }" :style="{
    'background-image': backgroundImage ? 'url(' + backgroundImage + ')' : '',
    'background-color': backgroundColor ? backgroundColor : 'transparent',
  }">
    <slot></slot>
  </div>

</template>

<style lang="scss" scoped>
.base-preview-item {
  border: 1px solid transparent;

  &.editor {
    padding: 10px 0 0 0;
  }
}

.editor {
  border: 1px dashed rgba(0, 0, 255, 0.38);

  &:hover {
    border-color: rgb(0, 0, 255);
  }
}
</style>