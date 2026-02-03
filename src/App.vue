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
    width: '1000',
    height: '1300'
  }
}

// const renderList: Block[] = [
//   {
//     "id": "774881ff-c2b7-4d8c-81b2-cc223606e505",
//     "name": "template_2",
//     "type": "layout",
//     "title": "Oznam",
//     "options": {
//       "columns": 1,
//       "switchCols": false,
//       "hasContainer": true,
//       "backgroundColor": "transparent",
//       "backgroundImage": "",
//       "styleClass": "",
//       "styles": "",
//       "columnStyles": {
//         "1": {
//           "styleClass": "col",
//           "backgroundImage": ""
//         }
//       }
//     },
//     "children": {
//       "1": [
//         {
//           "id": "2601a80f-7b82-4dcf-90ff-abd556a7e7b7",
//           "name": "text",
//           "type": "element",
//           "title": "Text",
//           "options": {
//             "text": "<p><span style=\"color: rgb(121, 69, 103); font-family: Pacifico, cursive;\">Oznamy<\/span><\/p>",
//             "hasContainer": true,
//             "backgroundImage": "",
//             "cssClasses": "bcpb:text-center",
//             "styles": "",
//             "lineHeight": 1,
//             "fontSize": "5",
//             "marginTop": 10,
//             "marginBottom": 10,
//             "marginLeft": 0,
//             "marginRight": 0
//           }
//         },
//         {
//           "id": "ce726570-643d-44c0-9369-71c9737a115f",
//           "name": "columns",
//           "type": "layout",
//           "title": "Columns",
//           "options": {
//             "columns": 1,
//             "switchCols": false,
//             "hasContainer": true,
//             "backgroundColor": "",
//             "backgroundImage": "",
//             "styleClass": "",
//             "styles": "",
//             "columnStyles": {
//               "1": {
//                 "styleClass": "col",
//                 "backgroundImage": "",
//                 "backgroundColor": "#1b1818",
//                 "marginLeft": 5,
//                 "marginRight": 5,
//                 "marginBottom": 5,
//                 "borderBottomLeftRadius": 20,
//                 "borderBottomRightRadius": 20,
//                 "borderTopRightRadius": 20,
//                 "borderTopLeftRadius": 20
//               }
//             }
//           },
//           "children": {
//             "1": [
//               {
//                 "id": "b98abd9c-111c-4147-81c8-8a98bd7fb70d",
//                 "name": "text",
//                 "type": "element",
//                 "title": "Text",
//                 "options": {
//                   "text": "<p><strong>SCH\u00d4DZA VLASTN\u00cdKOV BYTOV<\/strong><\/p>",
//                   "hasContainer": true,
//                   "backgroundImage": "",
//                   "cssClasses": "bcpb:text-center bcpb:text-white",
//                   "styles": "",
//                   "lineHeight": 1,
//                   "fontSize": 2.4,
//                   "marginTop": 8,
//                   "marginBottom": 8,
//                   "marginLeft": 8,
//                   "marginRight": 8
//                 }
//               },
//               {
//                 "id": "f9810ff3-30ca-4e6c-a129-a506b1036eb2",
//                 "name": "text",
//                 "type": "element",
//                 "title": "Text",
//                 "options": {
//                   "text": "\u00dadr\u017eba spolo\u010dn\u00fdch priestorov,<br>rozpo\u010det domu, opravy strechy,<br>v\u00fdmena v\u00fd\u0165ahu a spr\u00e1va fondu opr\u00e1v.",
//                   "hasContainer": true,
//                   "backgroundImage": "",
//                   "cssClasses": "bcpb:text-center bcpb:text-white",
//                   "styles": "",
//                   "lineHeight": "1.5",
//                   "fontSize": "2",
//                   "marginTop": 0,
//                   "marginBottom": 0,
//                   "marginLeft": 8,
//                   "marginRight": 8
//                 }
//               },
//               {
//                 "id": "ba69ac86-2307-46ac-b82f-25bfc0322eb0",
//                 "name": "text",
//                 "type": "element",
//                 "title": "Text",
//                 "options": {
//                   "text": "<p>17.9.2025 O 18:00<\/p>",
//                   "hasContainer": true,
//                   "backgroundImage": "",
//                   "cssClasses": "bcpb:text-center bcpb:text-white bcpb:font-bold",
//                   "styles": "",
//                   "lineHeight": 1,
//                   "fontSize": "2.5",
//                   "marginTop": 7,
//                   "marginBottom": 7,
//                   "marginLeft": 8,
//                   "marginRight": 8
//                 }
//               }
//             ]
//           }
//         },
//         {
//           "id": "39360df2-f0d1-4bed-bc06-75cd99a18364",
//           "name": "columns",
//           "type": "layout",
//           "title": "Columns",
//           "options": {
//             "columns": 1,
//             "switchCols": false,
//             "hasContainer": true,
//             "backgroundColor": "",
//             "backgroundImage": "",
//             "styleClass": "",
//             "styles": "",
//             "columnStyles": {
//               "1": {
//                 "styleClass": "col",
//                 "backgroundImage": "",
//                 "backgroundColor": "#1b1818",
//                 "marginLeft": 5,
//                 "marginRight": 5,
//                 "marginBottom": 2,
//                 "borderBottomLeftRadius": 20,
//                 "borderBottomRightRadius": 20,
//                 "borderTopRightRadius": 20,
//                 "borderTopLeftRadius": 20
//               }
//             }
//           },
//           "children": {
//             "1": [
//               {
//                 "id": "2bfb6d9a-8dd2-40f4-9a11-331aec56cb35",
//                 "name": "text",
//                 "type": "element",
//                 "title": "Text",
//                 "options": {
//                   "text": "<p><strong>SCH\u00d4DZA VLASTN\u00cdKOV BYTOV<\/strong><\/p>",
//                   "hasContainer": true,
//                   "backgroundImage": "",
//                   "cssClasses": "bcpb:text-center bcpb:text-white",
//                   "styles": "",
//                   "lineHeight": 1,
//                   "fontSize": 2.4,
//                   "marginTop": 8,
//                   "marginBottom": 8,
//                   "marginLeft": 8,
//                   "marginRight": 8,
//                   "backgroundColor": "#564e4e"
//                 }
//               },
//               {
//                 "id": "c56fae09-e02f-4279-b171-ac0d629e5c3e",
//                 "name": "text",
//                 "type": "element",
//                 "title": "Text",
//                 "options": {
//                   "text": "\u00dadr\u017eba spolo\u010dn\u00fdch priestorov,<br>rozpo\u010det domu, opravy strechy,<br>v\u00fdmena v\u00fd\u0165ahu a spr\u00e1va fondu opr\u00e1v.",
//                   "hasContainer": true,
//                   "backgroundImage": "",
//                   "cssClasses": "bcpb:text-center bcpb:text-white",
//                   "styles": "",
//                   "lineHeight": "1.5",
//                   "fontSize": "2",
//                   "marginTop": 0,
//                   "marginBottom": 0,
//                   "marginLeft": 8,
//                   "marginRight": 8
//                 }
//               },
//               {
//                 "id": "beeb9bfe-ca0b-4cc6-bf3c-7af45ff8b7e6",
//                 "name": "text",
//                 "type": "element",
//                 "title": "Text",
//                 "options": {
//                   "text": "<p>17.9.2025 O 18:00<\/p>",
//                   "hasContainer": true,
//                   "backgroundImage": "",
//                   "cssClasses": "bcpb:text-center bcpb:text-white bcpb:font-bold",
//                   "styles": "",
//                   "lineHeight": 1,
//                   "fontSize": "2.5",
//                   "marginTop": 7,
//                   "marginBottom": 7,
//                   "marginLeft": 8,
//                   "marginRight": 8
//                 }
//               }
//             ]
//           }
//         }
//       ]
//     }
//   }
// ]

// const settings = {
//   "name": "setting",
//   "options": {
//     "backgroundColor": "#fff",
//     "backgroundImage": "https:\/\/i.guim.co.uk\/img\/media\/2410610a153109a1dd9e0d0544c601d6342b644e\/0_0_4032_2419\/master\/4032.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=161370f6c161ec66a97cfde38b6de541"
//   },
//   "title": "Nastavenia",
//   "type": "setting"
// }

const mode = ref<Mode>('preview')
const settings = new SettingBlock;
const renderList: Block[] = []

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
