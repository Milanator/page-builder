<script setup lang="ts">
import BaseOption from '@/lib/block-components/BaseOption.vue';
import OptionWidget from '@/lib/widgets/OptionWidget.vue';
import SliderToggle from '@/lib/controls/SliderToggle.vue';
import MarginOption from "@/lib/block-components/partials/MarginOption.vue";
import BorderRadiusOption from '@/lib/block-components/partials/BorderRadiusOption.vue';
import { ImageBlock } from '@/lib/utils/blocks/ImageBlock.ts';
import { ElUpload, ElIcon } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useTranslator } from '@/lib/Translator';
import { useConfig } from '@/store/Config.ts';

import 'element-plus/dist/index.css';

const props = defineProps<{
    blockInfo: ImageBlock;
}>();

const background = ref([]);

const { t } = useTranslator();
const { uploader: Config } = useConfig()

if (!Config) {
    throw new Error('Uploader config is not defined')
}

const onImageUpload = ({ files }: any) => {
    setImage(files[0].public_url);
};

const onImageRemove = () => {
    setImage(undefined);
};

const setImage = (url: string | undefined) => {
    // @ts-ignore
    props.blockInfo.options.mediaUrl = url;
};
</script>
<template>
    <BaseOption title="Obrázok">
        <!-- Upload -->
        <OptionWidget title="Nahrať obrázok" align="vertical">
            <ElUpload v-model:file-list="background" class="upload-image" drag :action="Config?.url"
                :headers="Config?.headers" :on-success="onImageUpload" :on-remove="onImageRemove" multiple
                accept="image/png, image/jpeg, image/jpg, image/heic, image/heif" name="files[]">
                <div class="py-5 group w-full">
                    <ElIcon class="el-icon--upload group-hover:text-sky-500">
                        <UploadFilled />
                    </ElIcon>
                    <div class="el-upload__text -mt-2">
                        {{ t('drop_file') }} <em class="!text-sky-500">{{ t('click_to_upload') }}</em>
                    </div>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        {{ t('upload_rules') }}
                    </div>
                </template>
            </ElUpload>
        </OptionWidget>

        <!-- Object fit -->
        <OptionWidget :title="t('stretch_image')">
            <SliderToggle v-model="blockInfo.options.stretched" />
        </OptionWidget>

        <MarginOption :options="blockInfo.options" />

        <BorderRadiusOption :options="blockInfo.options" />
    </BaseOption>
</template>
<style scoped></style>
