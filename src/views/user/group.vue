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
  <n-modal v-model:show="modelVisible" preset="card" :title="modelTitle" :bordered="false" closable>
    <n-form :model="formModel" label-placement="left" :label-width="80">
      <n-form-item :label="$t('group.entity.groupName')" path="url">
        <n-input v-model:value="formModel.groupName" />
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
import { defineComponent, reactive, h, toRefs, computed } from 'vue'
import { NButton, useDialog } from "naive-ui"
import { netGroupList, netGroupAdd, netGroupDelete } from '@/api/group'
import { dialogDelete } from "@/utils/common"
import type { IGroup, IGroupInfo } from "@/types/group"
import { useI18n } from 'vue-i18n'
enum EModelType {
  add = "add",
  edit = "edit"
}
interface IState {
  tableData: IGroup[]
  modelVisible: boolean
  modelType: EModelType
  formModel: IGroupInfo
}
interface ICreateColumns {
  onEdit(row: IGroup): void
  onDelete(row: IGroup): void
  t(s: string): void
}
const defaultFormModel: IGroupInfo = {}
const createColumns = ({ onEdit, onDelete, t }: ICreateColumns) => {
  return [
    {
      title: t('group.entity.groupId'),
      key: 'groupId',
      align: 'center'
    },
    {
      title: t('group.entity.groupName'),
      key: 'groupName',
      align: 'center'
    },
    {
      title: t('column.operate'),
      key: 'actions',
      align: 'center',
      width: 200,
      render(row: IGroup) {
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
              () => t('button.edit')
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => onDelete(row)
              },
              () => t('button.delete')
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
    const dialog = useDialog()
    const state = reactive<IState>({
      tableData: [],
      modelVisible: false,
      modelType: EModelType.add,
      formModel: defaultFormModel
    })
    const getTableData = () => {
      netGroupList()
        .then(res => {
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
          paginationConfig.pageSize = res.data.length
        })
    }
    getTableData()
    const paginationConfig = reactive({
      page: 1,
      pageSize: 10,
      itemCount: 0,
      prefix: ({ itemCount }) => {
        return t('page.total',{ total:itemCount })
      }
    })
    return {
      ...toRefs(state),
      modelTitle: computed(() => {
        return {
          [EModelType.add]: t('model.add'),
          [EModelType.edit]: t('model.edit')
        }[state.modelType]
      }),
      columns: createColumns({
        t,
        onEdit(row) {
          console.log(row)
          state.formModel = JSON.parse(JSON.stringify(row))
          state.modelType = EModelType.edit
          state.modelVisible = true
        },
        onDelete(row) {
          console.log(row)
          dialogDelete(dialog, () => {
            netGroupDelete({ groupId: row.groupId })
              .then(() => {
                getTableData()
                window.$message.success('操作成功')
              })
          })
        }
      }),
      paginationConfig,
      onAdd() {
        state.formModel = JSON.parse(JSON.stringify(defaultFormModel))
        state.modelType = EModelType.add
        state.modelVisible = true
      },
      onSubmit() {
        console.log("提交")
        netGroupAdd(state.formModel)
          .then(() => {
            state.modelVisible = false
            getTableData()
            window.$message.success("操作成功")
          })
      }
    }
  }
})
</script>