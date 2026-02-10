<script setup lang="ts">
import { Block, Config } from "@/lib/utils/types.ts";
import { PageBuilder, SavePayload, Mode, SettingBlock } from "@/lib";
import { ref } from "vue";

const config: Config = {
  language: 'sk',
  uploader: {
    headers: {},
    url: ''
  },
  showDeviceBar: false,
  device: 'custom',
  // affect only if device = custom
  resolution: {
    width: '768',
    height: '1366'
  }
}

const mode = ref<Mode>('editor')
// const settings = new SettingBlock
const settings: SettingBlock = new SettingBlock
const renderList: Block[] = []
// const renderList: Block[] = []
// const renderList = [{ "id": "65478f66-457e-4c95-932c-15a84c9e76ef", "name": "template_1", "type": "layout", "title": "Text a obrázok", "options": { "columns": 2, "switchCols": false, "columnStyles": { "1": { "styleClass": "col" }, "2": { "styleClass": "col z-300" } } }, "children": { "1": [{ "id": "438f2d08-a4c5-48b9-b5b4-0e9840ab7fd7", "name": "image", "type": "element", "title": "Obrázok", "options": { "stretched": false, "cssClasses": "px-4", "mediaUrl": "https://placehold.co/200x200/EEE/31343C" } }], "2": [{ "id": "8d166b67-ac16-408d-bb0a-b67eae840c63", "name": "text", "type": "element", "title": "Text", "options": { "text": "Title", "cssClasses": "bcpb:pb-4 bcpb:px-4", "styles": "", "lineHeight": 1, "letterSpacing": 0, "fontSize": 2, "textColor": "#000" } }, { "id": "cd5b03f8-c097-466a-a637-522978cb69f3", "name": "text", "type": "element", "title": "Text", "options": { "text": "Text", "cssClasses": "bcpb:pb-4 bcpb:px-4", "styles": "", "lineHeight": 1, "letterSpacing": 0, "fontSize": 1, "textColor": "#000" } }] } }]

const onSave = ({ renderList, settings }: SavePayload) => {
  console.log(JSON.stringify(renderList), JSON.stringify(settings))
}

const onBack = () => { }

const onPreview = () => { }
</script>
<template>
  <PageBuilder :config="config" :render-list="renderList" :mode="mode" :settings="settings" @onSave="onSave"
    @onPreview="onPreview" @onBack="onBack" />
</template>
