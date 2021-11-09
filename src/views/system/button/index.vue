<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
    <n-form-item>
      <n-input clearable v-model:value="searchFormModel.modeName" placeholder="modeName" />
    </n-form-item>
    <n-form-item>
      <n-input clearable v-model:value="searchFormModel.name" placeholder="name" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" size="small" @click="onSearch">{{ $t('button.search') }}</n-button>
      <n-button type="primary" size="small" @click="onAdd">{{ $t('button.add') }}</n-button>
    </n-form-item>
  </n-form>

  <n-data-table
    remote
    size="small"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    :row-key="rowKey"
  />
  <n-modal
    v-model:show="buttonModelVisible"
    preset="card"
    :title="modelTitle"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form
        label-placement="left"
        :label-width="200"
        :model="buttonInfoFormModel"
        size="small"
      >
        <n-form-item :label="$t('system.button.entity.modeName')">
          <n-input clearable v-model:value="buttonInfoFormModel.modeName" />
        </n-form-item>
        <n-form-item :label="$t('system.button.entity.name')">
          <n-input clearable v-model:value="buttonInfoFormModel.name" />
        </n-form-item>
        <n-form-item :label="$t('system.button.entity.buttonCode')">
          <n-input clearable v-model:value="buttonInfoFormModel.buttonCode" />
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { netButtonAdd, netButtonDelete, netButtonList } from '@/api/button'
import { IMenu } from '@/types/menu'
import { dialogDelete } from '@/utils/common'
import { NButton, useDialog } from 'naive-ui'
import { computed, defineComponent, h, reactive, toRefs } from 'vue'
import { IButton, IButtonSearch } from '@/types/button'
import { useI18n } from 'vue-i18n'
enum EModelType {
    add = "add",
    edit = "edit"
}
interface IState {
    tableData: IButton[],
    buttonModelVisible: boolean,
    buttonInfoFormModel: Partial<IButton>,
    modelType: EModelType,
    searchFormModel: IButtonSearch
}
interface ICreateColumns {
    onDelete(row: IButton): void
    onEdit(row: IButton): void
    t(str: string): void
}

const createColumns = ({ t, onDelete, onEdit }: ICreateColumns) => {
    return [
        {
            title: t('system.button.entity.modeName'),
            key: 'modeName',
            align: 'center'
        },
        {
            title: t('system.button.entity.name'),
            key: 'name',
            align: 'center'
        },
        {
            title: t('system.button.entity.buttonCode'),
            key: 'buttonCode',
            align: 'center'
        },
        {
            title: t('column.operate'),
            align: 'center',
            render(row: IButton) {
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
                            { default: () => t('button.edit')  }
                        ),
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'error',
                                onClick: () => onDelete(row)
                            },
                            { default: () => t('button.delete') }
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
            buttonModelVisible: false,
            buttonInfoFormModel: {},
            modelType: EModelType.add,
            searchFormModel: {}
        })
        const handleSearchParams = (): IButtonSearch => {
            return state.searchFormModel
        }
        const getTableData = () => {
            netButtonList(handleSearchParams())
                .then(res => {
                    state.tableData = res.data
                })
        }
        getTableData()

        return {
            onSearch() {
                getTableData()
            },
            modelTitle: computed(() => {
                return {
                    [EModelType.add]: t('model.add'),
                    [EModelType.edit]: t('model.edit')
                }[state.modelType]
            }),
            rowKey: (row: IMenu) => row.id,
            ...toRefs(state),
            columns: createColumns({
                t,
                onEdit: (row) => {
                    console.log(row)
                    state.buttonInfoFormModel = JSON.parse(JSON.stringify(row))
                    state.modelType = EModelType.edit
                    state.buttonModelVisible = true
                },
                onDelete: (row) => {
                    console.log(row)
                    dialogDelete(dialog, () => {
                        netButtonDelete({ id: row.buttonId })
                            .then(() => {
                                getTableData()
                                window.$message.success(t('message.success'))
                            })
                    })
                }
            }),
            onSubmit() {
                netButtonAdd(state.buttonInfoFormModel)
                    .then(() => {
                        getTableData()
                        window.$message.success(t('message.success'))
                        state.buttonModelVisible = false
                    })
            },
            onAdd() {
                state.buttonInfoFormModel = {}
                state.modelType = EModelType.add
                state.buttonModelVisible = true
            }
        }
    }
})
</script>