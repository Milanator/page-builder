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
const settings = {
  "name": "setting",
  "type": "setting",
  "title": "Nastavenia",
  "options": {
    "backgroundImage": "https:\/\/media.licdn.com\/dms\/image\/v2\/D4D22AQEXTykr8vMGVA\/feedshare-shrink_800\/B4DZvrGmgAJgAg-\/0\/1769175935289?e=2147483647&v=beta&t=ei2Fozj1HcLaPgg5TVo_CcznbvlVEEb_ReWEZwXSMqY",
    "backgroundColor": "#ffffffc7"
  }
};
const renderList: Block[] = [
  {
    "id": "818c9980-937f-4c53-929a-3c9457e799a3",
    "name": "columns",
    "type": "layout",
    "title": "Columns",
    "options": {
      "columns": 2,
      "switchCols": false,
      "verticalAlign": "start",
      "columnStyles": {
        "1": {
          "styleClass": "col",
          "styles": "padding: 10px",
          "width": 50
        },
        "2": {
          "styleClass": "col",
          "styles": "padding: 10px",
          "width": 50
        }
      },
      "backgroundColor": "#404143ff"
    },
    "children": {
      "1": [
        {
          "id": "4f234d45-d4a3-4e89-8302-27e80a2e8f56",
          "name": "image",
          "type": "element",
          "title": "Obr\u00e1zok",
          "options": {
            "stretched": false,
            "mediaUrl": "http:\/\/api-digital-signage-smartcityportal.local:9110\/media\/eyJpdiI6IjhGRGZXc2xFU1lyWHJOYUllQ25ZM3c9PSIsInZhbHVlIjoiZ2ZlTGNYVnErSWFrWSsxUzZKb3paSWZQMW9mUXQydXhZb3NYZ1NFTVJGTTRzY1c5cTNCTTFXdFQ4N081WjRiQ1VwS0FtWDEzVllnZ2YvdnRJbzlXREE9PSIsIm1hYyI6ImNhMDJhMjRhZGFlMjNkZDYyNzk0ZGJmOTQ1YWNjYmRlMjk2ZGVmNjlkYmY1Y2Q4Y2I2ZmMyZTg5NjRhYWM4NzUiLCJ0YWciOiIifQ==",
            "marginRight": 62
          }
        }
      ],
      "2": [
        {
          "id": "2f61a65c-e0c5-4e31-97e1-6bab663a14ee",
          "name": "text",
          "type": "element",
          "title": "Text",
          "options": {
            "text": "<p><span style=\"color: rgb(255, 255, 255);\">VCHOD \u010c. <strong>2<\/strong><\/span><\/p>",
            "cssClasses": "",
            "styles": "",
            "lineHeight": 1.4,
            "letterSpacing": 0,
            "fontSize": 1,
            "textColor": "#000"
          }
        }
      ]
    }
  },
]

const onSave = ({ renderList, settings }: SavePayload) => {
  console.log(JSON.stringify(renderList), settings)
}

const onBack = () => { }

const onPreview = () => { }
</script>
<template>
  <PageBuilder :config="config" :render-list="renderList" :mode="mode" :settings="settings" @onSave="onSave"
    @onPreview="onPreview" @onBack="onBack" />
</template>
