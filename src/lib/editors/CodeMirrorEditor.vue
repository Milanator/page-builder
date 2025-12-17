<script setup lang="ts">
import Codemirror from "codemirror-editor-vue3";
import "codemirror/theme/dracula.css";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

interface Props {
  language?: string;
  theme?: string;
}

withDefaults(defineProps<Props>(), {
  language: 'text/css',
  theme: 'dracula'
})

const model = defineModel()
</script>
<template>
  <div class="bcpb:bg-white bcpb:border bcpb:border-gray-200 bcpb:rounded-lg bcpb:overflow-hidden bcpb:shadow-sm">    
    <!-- Editor Content -->
    <div class="relative">
      <Codemirror 
        v-model:value="model" 
        :options="{ 
          mode: language, 
          theme: theme,
          lineNumbers: true,
          lineWrapping: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          indentUnit: 2,
          tabSize: 2
        }"
        class="editor-container"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.CodeMirror) {
  height: auto;
  min-height: 120px;
  max-height: 400px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.4;
}

:deep(.CodeMirror-scroll) {
  min-height: 120px;
  max-height: 400px;
}

:deep(.CodeMirror-gutters) {
  border-right: 1px solid #3a3a3a;
}

:deep(.CodeMirror-linenumber) {
  color: #6b7280;
  padding: 0 8px;
}

/* Focus state */
:deep(.CodeMirror-focused) {
  outline: none;
}

.editor-container {
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
}
</style>