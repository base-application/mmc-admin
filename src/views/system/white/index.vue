<template>
  <n-button class="mb-2" size="small" type="primary" @click="onAdd">{{ $t('button.add') }}</n-button>
  <n-data-table
    remote
    size="small"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    :pagination="paginationConfig"
  />
  <!-- 新增、编辑模态框 -->
  <n-modal
    v-model:show="modelVisible"
    preset="card"
    :title="{ add: $t('model.add'), edit: $t('model.edit') }[modelType]"
    :bordered="false"
    closable
  >
    <n-form :model="formModel" label-placement="left" :label-width="80">
      <n-form-item :label="$t('system.white.entity.url')" path="url">
        <n-input v-model:value="formModel.url" />
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
import { h, defineComponent, reactive, toRefs } from 'vue'
import { NButton, PaginationInfo } from 'naive-ui'
import { netWhiteList, netWhiteAdd } from '@/api/white'
import { useI18n } from 'vue-i18n'

const createColumns = ({ onEdit, t }) => {
  return [
    {
      title: t('system.white.entity.url'),
      key: 'url',
      align: 'center'
    },
    {
      title: t('column.operate'),
      key: 'actions',
      align: 'center',
      width: 400,
      render(row) {
        return h(
          "div",
          {},
          [
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                onClick: () => onEdit(row)
              },
              { default: () => t('button.edit') }
            )
          ]
        )
      }
    }
  ]
}
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const state = reactive({
      tableData: [],
      formModel: {
        url: ''
      },
      modelVisible: false,
      modelType: "add"
    })
    const paginationConfig = reactive({
      itemCount: 0,
      pageSize: 0,
      prefix({ itemCount }: PaginationInfo) {
        return t('page.total',{ total:itemCount })
      }
    })
    const getTableData = () => {
      netWhiteList()
        .then(res => {
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
          paginationConfig.pageSize = res.data.length
        })
    }
    const columns = createColumns({
      t,
      onEdit: (row) => {
        state.formModel = JSON.parse(JSON.stringify(row))
        state.modelVisible = true
      }
    })
    const onAdd = () => {
      state.modelType = "add"
      state.modelVisible = true
    }
    getTableData()
    const onSubmit = () => {
      netWhiteAdd(state.formModel)
        .then(() => {
          state.modelVisible = false
          window.$message.success('操作成功')
          getTableData()
        })
    }
    return {
      ...toRefs(state),
      columns,
      paginationConfig,
      getTableData,
      onAdd,
      onSubmit
    }
  }
})
</script>