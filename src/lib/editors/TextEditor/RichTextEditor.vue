<script setup lang="ts">
import EditorMenu from "./EditorMenu.vue";
import { FontFamily } from '@tiptap/extension-font-family'
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { onBeforeUnmount, watch } from "vue";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { useTranslator } from '@/lib/Translator';
import { debounce } from "@/lib/utils/helper";

interface Props {
  bubbleMenu?: boolean,
  styles: any,
}

interface Emits {
  (event: 'onTextChange', value: EditorText): any,
}

type EditorText = string | undefined

withDefaults(defineProps<Props>(), {
  bubbleMenu: true
})

const model = defineModel<EditorText>()
const emit = defineEmits<Emits>()
let isEditorChange = false
const { t } = useTranslator();

const editor = new Editor({
  content: model.value || "",
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: t('start_writing_content'),
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty-node',
    }),
    TextStyle,
    Color,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    FontFamily.configure({
      types: ['textStyle'],
    }),
  ],
  onUpdate: ({ editor }) => {
    if (textContainsJson(editor.getHTML())) {
      return
    }

    isEditorChange = true
    model.value = editor.getHTML()
    debounceText(editor.getHTML())
    isEditorChange = false
  }
})

const debounceText = debounce((value: string) => emit('onTextChange', value), 800)

const textContainsJson = (html: EditorText) => html?.includes(`{"name":`)

// detect change from parents
watch(
  () => model.value,
  (value: EditorText) => {
    if ((!editor || isEditorChange) || value === editor.getHTML()) {
      return
    }

    editor.commands.setContent(value || '', false)
  }
)

onBeforeUnmount(() => {
  editor.destroy()
})
</script>
<template>
  <div class="rich-text-editor">
    <!-- Bubble Menu (floating toolbar) -->
    <bubble-menu :editor="editor" :tippy-options="{ duration: 100, theme: 'light-border', maxWidth: 400 }"
      v-if="bubbleMenu" class="bubble-menu-container">
      <EditorMenu :editor="editor" :bubble-menu="bubbleMenu" />
    </bubble-menu>
    <!-- Fixed Menu (toolbar above editor) -->
    <div v-else class="fixed-menu-container">
      <EditorMenu :editor="editor" :bubble-menu="bubbleMenu" />
    </div>
    <!-- Editor Content -->
    <div class="editor-content-wrapper">
      <editor-content :editor="editor" class="editor-content" :style="[
        {
          '--editor-line-height': styles.lineHeight || 1,
          fontSize: styles.fontSize,
          letterSpacing: styles.letterSpacing,
          color: styles.textColor,
        },
      ]" />
    </div>
  </div>
</template>
<style>
.editor-content ul {
  list-style: disc;
}

.editor-content ol {
  list-style: decimal;
}
</style>
<style scoped>
/* Rich Text Editor Container */
.rich-text-editor {
  position: relative;
  width: 100%;
}

/* Fixed Menu Container */
.fixed-menu-container {
  border-bottom: 1px solid #e5e7eb;
  background-color: rgba(249, 250, 251, 0.5);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

/* Editor Content Wrapper */
.editor-content-wrapper {
  position: relative;
}

/* Editor Content Styling */
.editor-content {
  width: 100%;
}

/* TipTap Editor Styles */
:deep(.ProseMirror) {
  width: 100%;
  /* line-height: 1.6;*/
  background-color: transparent;
  /* border: 1px solid #e5e7eb; */
  border-radius: 8px;
  outline: none;
}

:deep(.ProseMirror:focus) {
  outline: none;
  box-shadow: none;
}

/* When used with fixed menu, remove top border radius */
.fixed-menu-container+.editor-content-wrapper :deep(.ProseMirror) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
}

/* Empty state styling */
:deep(.ProseMirror.is-editor-empty::before) {
  content: attr(data-placeholder);
  color: var(--placeholder-text-color);
  pointer-events: none;
  position: absolute;
}

:deep(.ProseMirror .is-empty-node::before) {
  content: attr(data-placeholder);
  color: var(--placeholder-text-color);
  pointer-events: none;
  float: left;
  height: 0;
}

/* Typography Improvements */
:deep(.ProseMirror h1) {
  font-weight: 700;
}

:deep(.ProseMirror h1:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror h2) {
  font-weight: 600;
}

:deep(.ProseMirror h2:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror h3) {
  font-weight: 500;
}

:deep(.ProseMirror h3:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror h4) {
  font-weight: 500;
}

:deep(.ProseMirror h4:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror p) {
  margin-bottom: 12px;
  line-height: var(--editor-line-height);
}

:deep(.ProseMirror p:last-child) {
  margin-bottom: 0;
}

:deep(.ProseMirror ul, .ProseMirror ol) {
  margin: 12px 0;
  padding-left: 24px;
}

:deep(.ProseMirror li) {
  margin-bottom: 4px;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid #60a5fa;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 16px 0;
  background-color: #eff6ff;
  color: #374151;
  font-style: italic;
}

:deep(.ProseMirror code) {
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

:deep(.ProseMirror pre) {
  background-color: #111827;
  color: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  overflow-x: auto;
}

:deep(.ProseMirror pre code) {
  background-color: transparent;
  color: #f3f4f6;
  padding: 0;
}

/* Text alignment */
:deep(.ProseMirror [style*="text-align: left"]) {
  text-align: left;
}

:deep(.ProseMirror [style*="text-align: center"]) {
  text-align: center;
}

:deep(.ProseMirror [style*="text-align: right"]) {
  text-align: right;
}

/* Selection styling */
:deep(.ProseMirror ::selection) {
  background-color: #bfdbfe;
}
</style>