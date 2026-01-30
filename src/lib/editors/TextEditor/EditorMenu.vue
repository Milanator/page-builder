<script setup lang="ts">
import { ref } from "vue";
import type { Editor } from "@tiptap/vue-3";
import ColorPicker from "@/lib/block-components/partials/ColorPicker.vue";

type FONT_TYPE = {
  value: string
  label: string
}

interface Props {
  editor: Editor;
  bubbleMenu: boolean;
}

const props = defineProps<Props>();

const FONTS: FONT_TYPE[] = [
  {
    label: 'Poppins',
    value: 'Poppins, system-ui, sans-serif',
  },
  {
    label: 'JetBrains Mono',
    value: '"JetBrains Mono"'
  },
  {
    label: 'Pacifico',
    value: 'Pacifico, cursive'
  },
  {
    label: 'Playfair',
    value: '"Playfair Display", Georgia, serif'
  },
  {
    label: 'Roboto Slab',
    value: '"Roboto Slab", serif'
  },
  // 
  {
    label: 'Default',
    value: '',
  },
]

const dropDownMenus = ref<Record<string, boolean>>({
  paragraph: false,
  fontFamily: false,
  list: false,
  align: false
})

const onChangeFont = (font: FONT_TYPE) => {
  if (!props.editor) {
    return
  }

  if (font.value === '') {
    props.editor.chain().focus().unsetFontFamily().run()
    return;
  }

  props.editor.chain().focus().setFontFamily(font.value).run()
}

const closeDropdowns = () => {
  for (const key in dropDownMenus.value) {
    dropDownMenus.value[key] = false;
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (!(event.target as Element).closest('.dropdown-container')) {
    closeDropdowns()
  }
}

// Add event listener for click outside
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>
<template>
  <div class="editor-menu" :class="{ 'bubble-menu': bubbleMenu, 'fixed-menu': !bubbleMenu }">

    <!-- Font family -->
    <div class="dropdown-container bcpb:relative">
      <button @click.stop="dropDownMenus.fontFamily = !dropDownMenus.fontFamily"
        class="editor-menu-button dropdown-trigger" :class="{ 'active': dropDownMenus.fontFamily }">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6c7280">
          <path
            d="M256-240h84l44-122h192l44 122h84L522-720h-84L256-240Zm152-192 70-198h4l70 198H408ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0-640v640-640Z" />
        </svg>
        <svg class="bcpb:w-3 bcpb:h-3 bcpb:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div v-show="dropDownMenus.fontFamily" class="editor-dropdown-menu" style="min-width: 160px;">
        <!-- Inter -->
        <button v-for="font in FONTS" @click="onChangeFont(font)" class="editor-dropdown-item"
          :class="{ 'active': editor.isActive('textStyle', { fontFamily: font.value }) }">
          <span class="bcpb:text-sm" :style="{ fontFamily: font.value }">{{ font.label }}</span>
        </button>
      </div>
    </div>

    <!-- Color -->
    <div class="editor-color-picker-container">
      <div class="bcpb:relative">
        <ColorPicker :color="editor.getAttributes('textStyle').color"
          @onChange="($event: string) => editor.chain().focus().setColor($event).run()" />
      </div>
    </div>

    <!-- Text Format Dropdown -->
    <div class="dropdown-container bcpb:relative">
      <button @click.stop="dropDownMenus.paragraph = !dropDownMenus.paragraph"
        class="editor-menu-button dropdown-trigger" :class="{ 'active': dropDownMenus.paragraph }">
        <img src="@/assets/icons/paragraph.svg" alt="Paragraph">
        <svg class="bcpb:w-3 bcpb:h-3 bcpb:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div v-show="dropDownMenus.paragraph" class="editor-dropdown-menu" style="min-width: 160px;">
        <button @click="editor.chain().focus().setParagraph().run(); closeDropdowns()" class="editor-dropdown-item"
          :class="{ 'active': editor.isActive('paragraph') }">
          <span class="bcpb:text-sm">Paragraph</span>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run(); closeDropdowns()"
          class="editor-dropdown-item" :class="{ 'active': editor.isActive('heading', { level: 1 }) }">
          <span class="bcpb:text-lg bcpb:font-bold">Heading 1</span>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run(); closeDropdowns()"
          class="editor-dropdown-item" :class="{ 'active': editor.isActive('heading', { level: 2 }) }">
          <span class="bcpb:text-base bcpb:font-semibold">Heading 2</span>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run(); closeDropdowns()"
          class="editor-dropdown-item" :class="{ 'active': editor.isActive('heading', { level: 3 }) }">
          <span class="bcpb:text-sm bcpb:font-medium">Heading 3</span>
        </button>
      </div>
    </div>

    <!-- Text Formatting -->
    <div class="editor-button-group">
      <button @click="editor.chain().focus().toggleBold().run()" class="editor-menu-button"
        :class="{ 'active': editor.isActive('bold') }" title="Bold">
        <img src="@/assets/icons/bold.svg" alt="Bold">
      </button>

      <button @click="editor.chain().focus().toggleItalic().run()" class="editor-menu-button"
        :class="{ 'active': editor.isActive('italic') }" title="Italic">
        <img src="@/assets/icons/italic.svg" alt="Italic">
      </button>

      <button @click="editor.chain().focus().toggleStrike().run()" class="editor-menu-button"
        :class="{ 'active': editor.isActive('strike') }" title="Strikethrough">
        <img src="@/assets/icons/strikethrough.svg" alt="Strikethrough">
      </button>
    </div>

    <div class="dropdown-container bcpb:relative">
      <button @click.stop="dropDownMenus.list = !dropDownMenus.list" class="editor-menu-button dropdown-trigger"
        :class="{ 'active': dropDownMenus.list }">
        <img src="@/assets/icons/unordered_list.svg" alt="Unordered list">
        <svg class="bcpb:w-3 bcpb:h-3 bcpb:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div v-show="dropDownMenus.list" class="editor-dropdown-menu">
        <button @click="editor.chain().focus().toggleBulletList().run()" class="editor-menu-button"
          :class="{ 'active': editor.isActive('bulletList') }" title="Bullet List">
          <img src="@/assets/icons/unordered_list.svg" alt="Unordered list">
        </button>

        <button @click="editor.chain().focus().toggleOrderedList().run()" class="editor-menu-button"
          :class="{ 'active': editor.isActive('orderedList') }" title="Numbered List">
          <img src="@/assets/icons/ordered_list.svg" alt="Ordered list">
        </button>
      </div>
    </div>

    <!-- Lists & Blocks -->
    <div class="editor-button-group">
      <button @click="editor.chain().focus().toggleBlockquote().run()" class="editor-menu-button"
        :class="{ 'active': editor.isActive('blockquote') }" title="Blockquote">
        <img src="@/assets/icons/quote.svg" alt="Quote">
      </button>

      <!-- <button @click="editor.chain().focus().toggleCodeBlock().run()" class="editor-menu-button"
        :class="{ 'active': editor.isActive('codeBlock') }" title="Code Block">
        <img src="@/assets/icons/bracket.svg" alt="Bracket">
      </button> -->
    </div>

    <div class="dropdown-container bcpb:relative">
      <button @click.stop="dropDownMenus.align = !dropDownMenus.align" class="editor-menu-button dropdown-trigger"
        :class="{ 'active': dropDownMenus.align }">
        <img src="@/assets/icons/align-left.svg" alt="Align left" />
        <svg class="bcpb:w-3 bcpb:h-3 bcpb:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div v-show="dropDownMenus.align" class="editor-dropdown-menu">
        <button @click="editor.chain().focus().setTextAlign('left').run()" class="editor-menu-button"
          :class="{ 'active': editor.isActive({ textAlign: 'left' }) }" title="Align Left">
          <img src="@/assets/icons/align-left.svg" alt="Align left" />
        </button>

        <button @click="editor.chain().focus().setTextAlign('center').run()" class="editor-menu-button"
          :class="{ 'active': editor.isActive({ textAlign: 'center' }) }" title="Align Center">
          <img src="@/assets/icons/align-center.svg" alt="Align center" />
        </button>

        <button @click="editor.chain().focus().setTextAlign('right').run()" class="editor-menu-button"
          :class="{ 'active': editor.isActive({ textAlign: 'right' }) }" title="Align Right">
          <img src="@/assets/icons/align-right.svg" alt="Align right" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dropdown-container {
  position: relative;
}

/* Icon adjustments */
.editor-menu-button span {
  font-size: 14px;
}
</style>