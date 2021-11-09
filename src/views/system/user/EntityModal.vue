<template>
  <n-modal
    v-model:show="selfVisile"
    @update:show="updateShow"
    preset="card"
    :title="title"
    :bordered="false"
    closable
    @close="handleClose"
  >
    <n-form :model="formModel" label-placement="left" :label-width="80" size="small">
      <n-form-item :label="$t('system.user.entity.loginName')" path="loginName">
        <n-input v-model:value="formModel.loginName" />
      </n-form-item>
      <n-form-item :label="$t('system.user.entity.password')" path="password" v-if="type === 'add'">
        <n-input v-model:value="formModel.password" />
      </n-form-item>
    </n-form>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { netUserAdd } from "@/api/user"
import { defineComponent, computed, ref, watch } from 'vue'
import { useMessage } from "naive-ui"
import { IUser } from "@/types/user"
import { useI18n } from "vue-i18n"
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "add"
    },
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => { { } }
    }
  },
  emits: ['update:visible', 'refesh'],
  setup(props, ctx) {
    const { t } = useI18n()
    const message = useMessage()
    const entityFormRef = ref()
    const updateShow = (value: boolean) => {
      ctx.emit("update:visible", value)
    }

    const handleClose = () => {
      ctx.emit("update:visible", false)
    }
    const selfVisile = computed(() => {
      return props.visible
    })
    const onSubmit = () => {
      addHandler()
    }
    const addHandler = () => {
      formModel.value.enable = true
      netUserAdd(formModel.value)
        .then(() => {
          handleClose()
          ctx.emit("refesh")
          message.success(t("message.success"))
        })
    }
    const title = computed(() => {
      return {
        add: t('model.add'),
        edit: t('model.edit')
      }[props.type]
    })
    let formModel = ref<IUser>(JSON.parse(JSON.stringify(props.data)))
    watch(() => props.visible, (visible) => {
      if (visible) {
        formModel.value = JSON.parse(JSON.stringify(props.data))
      }
    })


    return {
      formModel,
      title,
      entityFormRef,
      selfVisile,
      updateShow,
      handleClose,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
</style>