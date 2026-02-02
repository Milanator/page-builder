<script setup lang="ts">
import Sidebar from "./layouts/Sidebar.vue";
import ToolBar from "./layouts/ToolBar.vue";
import PagePreview from "./PagePreview.vue";
import { usePageBuilder } from "./PageBuilder.ts";
import { onMounted, onUnmounted, provide, ref, watch, watchEffect } from "vue";
import { previewComponentMap, previewOptionMap } from "@/lib/utils/registry.ts";
import { Mode, Block, Config, Device } from "@/lib/utils/types.ts";
import { useTranslator } from '@/lib/Translator';
import { ConfigKey } from "@/store/Config.ts";
import { SettingBlock } from "@/lib/utils/blocks/SettingBlock.ts";
import { background } from "./utils/style.ts";
import { sanitizeRenderList, sanitizeSettings } from "@/lib/utils/formatter.ts";
import { EditorState, useHistory } from "./History.ts";


interface Props {
  config: Config
  renderList?: Block[]
  mode?: Mode
  settings?: SettingBlock
}

interface Emits {
  (event: 'onSave', value: any): void,
  (event: 'onBack', value: any): void,
  (event: 'onPreview'): void,
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  mode: 'editor' as Mode,
  config: () => ({
    language: 'sk',
    resolution: {},
    device: 'desktop' as Device
  }) as Config,
  settings: () => new SettingBlock
});

const mode = ref<Mode>(props.mode);
const selectedDevice = ref<Device>(props.config.device)
const settings = ref<SettingBlock>(props.settings)
const height = ref<String | Number | undefined>(props.config.resolution?.height)
const width = ref<String | Number | undefined>(props.config.resolution?.width)

const devices: Record<Device, string> = {
  'desktop': 'bcpb:w-full',
  'tab': 'bcpb:w-4xl bcpb:mx-auto',
  'mobile': 'bcpb:w-full bcpb:max-w-sm bcpb:mx-auto bcpb:px-4',
  'custom': 'bcpb:mx-auto'
}

const {
  renderList,
  dragOverIndex,
  selectedOptionComponent,
  dragOverChildElement,
  onDrop,
  onDropChildElement,
  onDragLeave,
  onDragOver,
  startDragItem,
  onDragOverItem,
  onDragOverChildElement,
  onItemSelect,
  onSelectFormChildElement,
  onDelete
} = usePageBuilder()
const { init: initHistory, commit, undo, redo, canUndo, canRedo } = useHistory()

provide(ConfigKey, props.config)

const { t } = useTranslator(props.config.language);

watchEffect(() => {
  renderList.value = props.renderList ? [...props.renderList] : []
})

watch(
  () => props.settings,
  val => {
    if (val) settings.value = val
  }
)

watch(
  () => props.mode,
  (value: Mode) => {
    if (value === 'preview') {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    }
  }
)

onMounted(() => {
  initHistory({ renderList: renderList.value, settings: settings.value, selectedOptionComponent: selectedOptionComponent.value })

  document.addEventListener('keydown', handleKeyDown); // Add ESC key listener
})

onUnmounted(() => {
  // Cleanup ESC key listener
  document.removeEventListener('keydown', handleKeyDown);
})

// ESC key listener for preview mode
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && mode.value === 'editor_preview') {
    mode.value = 'editor';
  }
};

const exportPage = ($event: Event) => {
  $event.preventDefault();
  emit('onSave', {
    renderList: sanitizeRenderList(renderList.value),
    settings: sanitizeSettings(settings.value)
  })
}

const onUndo = () => {
  const presentState: EditorState | void = undo()

  if (presentState) {
    updateHistory(presentState)
  }
}

const onRedo = () => {
  const presentState: EditorState | void = redo();
  if (presentState) {
    updateHistory(presentState)
  }
}

const updateHistory = (state: EditorState) => {
  renderList.value = state.renderList
  settings.value = state.settings
  selectedOptionComponent.value = state.selectedOptionComponent
}

const onChangeHistory = (fn: () => void) => {
  fn()
  console.log('onChangeHistory')
  commit({ renderList: renderList.value, settings: settings.value, selectedOptionComponent: selectedOptionComponent.value })
}
</script>
<template>
  <!-- Preview (editor) -->
  <div v-if="mode !== 'editor'" class="bcpb:w-fulk bcpb:z-[9999] h-full"
    :class="{ 'bcpb:fixed bcpb:inset-0 bcpb:overflow-auto': mode === 'editor_preview' }" :style="[
      settings.options,
      background(settings.options)
    ]">
    <template v-if="mode === 'editor_preview'">
      <!-- Floating Action Bar -->
      <div class="floating-action-bar bcpb:fixed bcpb:bottom-6 bcpb:right-6 bcpb:z-[99998] bcpb:flex bcpb:gap-3">
        <!-- Back to Editor Button -->
        <button @click="mode = 'editor'"
          class="bcpb:bg-blue-600 hover:bcpb:bg-blue-700 bcpb:text-white bcpb:px-6 bcpb:py-3 bcpb:rounded-full bcpb:shadow-lg hover:bcpb:shadow-xl bcpb:font-medium bcpb:transition-all bcpb:duration-200 hover:bcpb:scale-105 focus:bcpb:outline-none focus:bcpb:ring-4 focus:bcpb:ring-blue-500/20 bcpb:flex bcpb:items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"
            class="bcpb:w-5 bcpb:h-5 bcpb:cursor-pointer bcpb:mr-1">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
          {{ t('back_to_editor') }}
        </button>
        <!-- Save Button in Preview -->
        <button @click="exportPage($event)"
          class="bcpb:bg-green-600 hover:bcpb:bg-green-700 bcpb:text-white bcpb:px-6 bcpb:py-3 bcpb:rounded-full bcpb:shadow-lg hover:bcpb:shadow-xl bcpb:font-medium bcpb:transition-all bcpb:duration-200 hover:bcpb:scale-105 focus:bcpb:outline-none focus:bcpb:ring-4 focus:bcpb:ring-green-500/20 bcpb:flex bcpb:items-center bcpb:cursor-pointer">
          <img src="@/assets/icons/save.svg" alt="Save" class="bcpb:w-5 bcpb:h-5 bcpb:cursor-pointer bcpb:mr-1">
          {{ t('save') }}
        </button>
      </div>
    </template>
    <!-- Preview Content Container -->
    <div class="bcpb:w-full bcpb:min-h-full h-full">
      <PagePreview :renderList="renderList"></PagePreview>
    </div>
  </div>
  <!-- Full editor -->
  <div v-else class="bcpb:flex bcpb:h-screen bcpb:bg-gray-50">
    <!-- Left Side - Drop Zone -->
    <div class="bcpb:flex-1 bcpb:bg-white bcpb:border-r bcpb:border-gray-100 bcpb:flex bcpb:flex-col">
      <ToolBar :config="config" :device="selectedDevice" :show-device-toolbar="config.showDeviceBar"
        :can-undo="Boolean(canUndo())" :can-redo="Boolean(canRedo())" @on-preview="emit('onPreview')"
        @on-save="exportPage" @on-back="emit('onBack', true)" @on-device="selectedDevice = $event"
        @on-settings="onItemSelect(settings)" @on-undo="onUndo" @on-redo="onRedo" />
      <!-- Canvas Area -->
      <div class="bcpb:flex-1 bcpb:p-4 bcpb:overflow-auto">
        <!-- Customize size -->
        <div v-if="config.showDeviceBar && selectedDevice === 'custom'"
          class="flex bcpb:gap-4 bcpb:justify-center mb-4">
          <div>
            <label class="flex bcpb:items-center">
              <span class="bcpb:pr-2">{{ t('width') }}:</span>
              <input type="number" min="1" :placeholder="t('width')"
                class="bcpb:w-24 bcpb:rounded-xl bcpb:bg-[#f9fafc] p-2" v-model="width">
            </label>
          </div>
          <div>
            <label class="flex bcpb:items-center">
              <span class="bcpb:pr-2">{{ t('height') }}:</span>
              <input type="number" min="1" :placeholder="t('height')"
                class="bcpb:w-24 bcpb:rounded-xl bcpb:bg-[#f9fafc] p-2" v-model="height">
            </label>
          </div>
        </div>

        <div :class="devices[selectedDevice]" :style="selectedDevice === 'custom'
          ? {
            width: `${width}px`,
            height: `${height}px`,
          }
          : {}">
          <!-- Drop Zone -->
          <div @drop="onChangeHistory(() => onDrop($event))" @dragenter.prevent @dragleave.prevent="onDragLeave()"
            @dragover.prevent="onDragOver($event)" :style="[
              settings.options,
              background(settings.options)
            ]"
            class="drop-zone bcpb:bg-center bcpb:bg-cover bcpb:min-h-[700px] bcpb:border-2 bcpb:border-dashed bcpb:border-gray-200 bcpb:rounded-xl bcpb:relative bcpb:overflow-hidden bcpb:transition-all bcpb:duration-300 bcpb:h-full">
            <div v-for="(block, index) of renderList" draggable="true" :key="`r_item_${index}`"
              @dragover="onDragOverItem($event, index)" @dragstart="startDragItem($event, block, index)">
              <div :class="{ 'drag-over': dragOverIndex == index && !dragOverChildElement }">
              </div>
              <component :is="previewComponentMap[block.name]" :blockInfo="block" :inEditor="true"
                @onSelectChildElement="onSelectFormChildElement" @onDragOverChildElement="onDragOverChildElement"
                @onDropChildElement="onChangeHistory(() => onDropChildElement())" @click="onItemSelect(block)"
                @onTextChange="onChangeHistory(() => { })">
              </component>
            </div>
            <!-- Enhanced No Item State -->
            <div v-if="renderList.length == 0"
              class="no-item bcpb:absolute bcpb:inset-0 bcpb:flex bcpb:items-center bcpb:justify-center">
              <div class="bcpb:text-center bcpb:p-12 bcpb:max-w-md bcpb:mx-auto">
                <!-- Icon Container -->
                <div class="bcpb:relative bcpb:mb-6">
                  <div
                    class="bcpb:w-24 bcpb:h-24 bcpb:mx-auto bcpb:bg-gradient-to-br bcpb:from-blue-100 bcpb:to-purple-100 bcpb:rounded-full bcpb:flex bcpb:items-center bcpb:justify-center bcpb:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#155dfc"
                      class="bi bi-info-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                  </div>
                  <!-- Floating Animation Elements -->
                  <div
                    class="bcpb:absolute bcpb:-top-2 bcpb:-right-2 bcpb:w-4 bcpb:h-4 bcpb:bg-blue-400 bcpb:rounded-full bcpb:animate-pulse">
                  </div>
                  <div
                    class="bcpb:absolute bcpb:-bottom-1 bcpb:-left-3 bcpb:w-3 bcpb:h-3 bcpb:bg-purple-400 bcpb:rounded-full bcpb:animate-pulse bcpb:delay-75">
                  </div>
                </div>
                <!-- Content -->
                <div class="bcpb:space-y-4">
                  <h3 class="bcpb:text-xl bcpb:font-semibold bcpb:text-gray-800">{{ t('place_for_elements') }}</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- Sidebar portion where the element will be shown and user can modify selected elements-->
    <Sidebar></Sidebar>
    <!-- Options Panel with Transition -->
    <Transition name="slide-left">
      <div v-if="selectedOptionComponent"
        class="bcpb:fixed bcpb:right-0 bcpb:top-0 bcpb:bottom-0 bcpb:w-100 bcpb:bg-white bcpb:border-l bcpb:border-gray-200 bcpb:z-50">
        <!-- Content -->
        <div class="bcpb:flex-1 bcpb:overflow-y-auto">
          <component v-if="selectedOptionComponent" :is="previewOptionMap[selectedOptionComponent.name]"
            :blockInfo="selectedOptionComponent" @onClose="selectedOptionComponent = null"
            @onDelete="onChangeHistory(() => onDelete($event))" @onChangeOption="onChangeHistory(() => { })">
          </component>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
/* Slide-left transition for options panel */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(100%);
}

/* Enhanced drag over states */
.drag-over {
  border: 2px dashed #3b82f6;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {

  0%,
  100% {
    border-color: #3b82f6;
  }

  50% {
    border-color: #2563eb;
  }
}

.drop-zone {
  padding-bottom: 2rem !important;
}

/* Drop zone active state */
.drop-zone.drag-active {
  border-color: #60a5fa;
  background: linear-gradient(to bottom right, rgba(147, 197, 253, 0.5), rgba(219, 234, 254, 0.3), rgba(196, 181, 253, 0.4));
  animation: drop-zone-glow 2s infinite alternate;
}

@keyframes drop-zone-glow {
  0% {
    border-color: #60a5fa;
  }

  100% {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
  }
}

/* Enhanced Preview Mode Styles */
.preview-close-button {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Floating Action Bar Animation */
.floating-action-bar {
  animation: slideUpFade 0.3s ease-out;
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Preview Mode Indicator Animation */
.preview-mode-indicator {
  animation: fadeInSlide 0.4s ease-out;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>