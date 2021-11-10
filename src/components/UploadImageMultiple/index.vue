<template>
  <n-upload
    :action="action"
    :headers="headers"
    :show-file-list="showFileList"
    v-bind="$attrs"
    @finish="onFinish"
    @remove="onRemove"
  >
    <div class="n-upload-trigger n-upload-trigger--image-card">
      <div class="n-upload-dragger">
        <i class="n-base-icon">
          <svg
            width="512"
            height="512"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 112V400M400 256H112"
              stroke="currentColor"
              stroke-width="32"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
      </div>
    </div>
  </n-upload>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { useUserStore } from "@/store/modules/user"
export default defineComponent({
  inheritAttrs: false,
  props: {
    showFileList: {
      type: Boolean,
      default: false
    }
  },
  emits: ['finish', 'remove'],
  setup(_props, context) {
    const userStore = useUserStore()
    const baseUrl = import.meta.env.VITE_BASE_API
    return {
      action: ref(`${baseUrl}/img/upload`),
      headers: {
        Authorization: 'Bearer ' + userStore.getToken
      },
      onFinish({ event, file }) {
        const response = JSON.parse(event.target.response)
        file.url = response.data
        context.emit('finish', response.data)
      },
      onRemove({ file }) {
        context.emit('remove', file)
      }
    }
  }

})
</script>