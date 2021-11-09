<template>
  <textarea id="tinymceId"></textarea>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue"
import { useSysStore } from "@/store/modules/sys"
import tinymce from 'tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/image'
import { ELang } from "@/types/common"
import { netUpload } from "@/api/common"
import { ImageAddBaseUrl } from "@/utils/common"

// import 'tinymce/plugins/advlist'
// import 'tinymce/plugins/anchor'
// import 'tinymce/plugins/autolink'
// import 'tinymce/plugins/autosave'
// import 'tinymce/plugins/code'
// import 'tinymce/plugins/codesample'
// import 'tinymce/plugins/directionality'
// import 'tinymce/plugins/fullscreen'
// import 'tinymce/plugins/hr'
// import 'tinymce/plugins/insertdatetime'
// import 'tinymce/plugins/link'
// import 'tinymce/plugins/lists'
// import 'tinymce/plugins/media'
// import 'tinymce/plugins/nonbreaking'
// import 'tinymce/plugins/noneditable'
// import 'tinymce/plugins/pagebreak'
// import 'tinymce/plugins/paste'
// import 'tinymce/plugins/preview'
// import 'tinymce/plugins/print'
// import 'tinymce/plugins/save'
// import 'tinymce/plugins/searchreplace'
// import 'tinymce/plugins/spellchecker'
// import 'tinymce/plugins/tabfocus'
// // import 'tinymce/plugins/table';
// import 'tinymce/plugins/template'
// import 'tinymce/plugins/textpattern'
// import 'tinymce/plugins/visualblocks'
// import 'tinymce/plugins/visualchars'
// import 'tinymce/plugins/wordcount'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const sysStore = useSysStore()
    const editorLang = () => {
      return {
        [ELang.enUS]: 'en',
        [ELang.zhCN]: 'zh_CN'
      }[sysStore.getLang]
    }
    onMounted(() => {
      tinymce.baseURL = `/${import.meta.env.BASE_URL}/resource/tinymce`
      tinymce.init({
        selector: "#tinymceId",
        language: editorLang(),
        plugins: 'image',
        images_upload_handler: (blobInfo, succFun, failFun) => {
          console.log('blobInfo', blobInfo)
          console.log('succFun', succFun)
          console.log('failFun', failFun)
          const param = new FormData()
          param.append('file', blobInfo.blob())
          netUpload(param)
            .then(res => {
              succFun(`${ImageAddBaseUrl(res.data)}`)
            })
        },
        setup: (editor) => {
          editor.on('init', () => {
            editor.setContent(props.value)
          })
          editor.on('change', () => {
            editor.save()
            emit("update:value", editor.getContent())
          })
        }
      })
    })
    onUnmounted(() => {
      tinymce.remove()
    })
  }
})
</script>