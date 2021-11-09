<template>
  <n-modal v-model:show="selfVisile" @update:show="updateShow">
    <n-card :title="title" :bordered="false" closable @close="handleClose">
      <n-form :model="formModel" label-placement="left" :label-width="80">
        <n-form-item :label="$t('system.role.entity.name')" path="role">
          <n-input v-model:value="formModel.name" />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="flex justify-end">
          <n-button type="primary" @click="onSubmit">{{ $t('button.submit') }}</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { netRoleAdd } from "@/api/role"
import { defineComponent, computed, ref, watchEffect } from 'vue'
import { useMessage } from "naive-ui"
import { IRole } from "@/types/role"
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
      netRoleAdd(formModel.value)
        .then(() => {
          handleClose()
          ctx.emit("refesh")
          message.success(t('message.success'))
        })
    }
    const title = computed(() => {
      return {
        add: t('model.add'),
        edit: t('model.edit')
      }[props.type]
    })

    const formModel = ref<IRole>({})
    watchEffect(() => {
      formModel.value = JSON.parse(JSON.stringify(props.data))
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