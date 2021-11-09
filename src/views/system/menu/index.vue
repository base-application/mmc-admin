<template>
  <n-button type="primary" size="small" class="mb-2" @click="onAddOut">{{ $t('button.add') }}</n-button>
  <n-data-table
    remote
    size="small"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    :row-key="rowKey"
  />
  <n-modal
    v-model:show="menuModelVisible"
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
        :model="menuInfoFormModel"
        size="small"
      >
        <n-form-item label="名称">
          <n-input clearable v-model:value="menuInfoFormModel.name" />
        </n-form-item>
        <n-form-item label="Icon" class="flex-wrap">
          <div>
            <n-button
              style="margin:0;"
              v-for="(icon,index) in Object.keys(icons)"
              :key="index"
              :type="menuInfoFormModel.menuIcon === icon ? 'primary' : ''"
              @click="() => menuInfoFormModel.menuIcon = icon"
            >
              <template #icon>
                <n-icon>
                  <component :is="icons[icon]" />
                </n-icon>
              </template>
            </n-button>
          </div>
          <!-- <n-input clearable v-model:value="menuInfoFormModel.menuIcon" /> -->
        </n-form-item>
        <n-form-item label="Path">
          <n-input clearable v-model:value="menuInfoFormModel.path" />
        </n-form-item>
        <n-form-item label="组件路径">
          <n-input clearable v-model:value="menuInfoFormModel.component" />
        </n-form-item>
        <n-form-item label="排序">
          <n-input clearable v-model:value="menuInfoFormModel.priority" />
        </n-form-item>
        <n-form-item label="重定向路径">
          <n-input clearable v-model:value="menuInfoFormModel.redirect" />
        </n-form-item>
        <n-form-item label="是否隐藏">
          <div>
            <n-switch v-model:value="menuInfoFormModel.hidden" />
          </div>
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { netMenuList, netMenuAdd, netMenuDelete } from '@/api/menu'
import { IMenu } from '@/types/menu'
import { dialogDelete, renderIcon } from '@/utils/common'
import { NButton, useDialog } from 'naive-ui'
import { computed, defineComponent, h, reactive, toRefs, watchEffect } from 'vue'
import icons from '@/utils/icons'
import { useI18n } from 'vue-i18n'

enum EModelType {
    add = "add",
    edit = "edit"
}
interface IState {
    tableData: IMenu[],
    menuModelVisible: boolean,
    menuInfoFormModel: Partial<IMenu>,
    modelType: EModelType
}
interface ICreateColumns {
    onAdd(row: IMenu): void
    onDelete(row: IMenu): void
    onEdit(row: IMenu): void
    t(c: string): void
}
const createColumns = ({ onAdd, onDelete, onEdit, t }: ICreateColumns) => {
    return [
        {
            title: t('system.menu.entity.name'),
            key: 'name',
            align: 'center',
            render(row: IMenu) {
                return `${t(row.name)}`
            }
        },
        {
            title: t('system.menu.entity.menuIcon'),
            key: 'menuIcon',
            align: 'center',
            render(row: IMenu) {
                if (row.menuIcon) {
                    return renderIcon(icons[row.menuIcon])()
                }
                return ''
            }
        },
        {
            title: t('system.menu.entity.path'),
            key: 'path',
            align: 'center'
        },
        {
            title: t('system.menu.entity.component'),
            key: 'component',
            align: 'center'
        },
        {
            title: t('system.menu.entity.meta'),
            key: 'meta',
            align: 'center'
        },
        {
            title: t('system.menu.entity.priority'),
            key: 'priority',
            align: 'center'
        },
        {
            title: t('system.menu.entity.redirect'),
            key: 'redirect',
            align: 'center'
        },
        {
            title: t('system.menu.entity.hidden'),
            key: 'hidden',
            align: 'center',
            render(row: IMenu) {
                return `${row.hidden}`
            }
        },
        {
            title: t('column.operate'),
            align: 'center',
            width: 250,
            render(row: IMenu) {
                return h(
                    "div",
                    {},
                    [
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                onClick: () => onAdd(row)
                            },
                            { default: () => t('button.add') }
                        ),
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                onClick: () => onEdit(row)
                            },
                            { default: () => t('button.edit') }
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
        const getTableData = () => {
            netMenuList()
                .then(res => {
                    state.tableData = res.data
                })
        }
        getTableData()
        const state = reactive<IState>({
            tableData: [],
            menuModelVisible: false,
            menuInfoFormModel: {},
            modelType: EModelType.add
        })
        const onAddCommonHandle = () => {
            state.modelType = EModelType.add
            state.menuModelVisible = true
        }
        watchEffect(() => {
            const meta = {
                hidden: state.menuInfoFormModel.hidden || false,
                title: state.menuInfoFormModel.name,
                icon: state.menuInfoFormModel.menuIcon
            }
            state.menuInfoFormModel.meta = JSON.stringify(meta)
        })
        return {
            icons,
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
                onAdd: (row) => {
                    state.menuInfoFormModel = {
                        pid: row.id,
                        priority: 1
                    }
                    onAddCommonHandle()
                    console.log(row)

                },
                onEdit: (row) => {
                    console.log(row)
                    state.menuInfoFormModel = JSON.parse(JSON.stringify(row))
                    state.modelType = EModelType.edit
                    state.menuModelVisible = true
                },
                onDelete: (row) => {
                    console.log(row)
                    dialogDelete(dialog, () => {
                        netMenuDelete({ id: row.id })
                            .then(() => {
                                getTableData()
                                window.$message.success(t('message.success'))
                            })
                    })
                }
            }),
            onSubmit() {
                console.log("ppp")
                netMenuAdd(state.menuInfoFormModel)
                    .then(() => {
                        getTableData()
                        window.$message.success(t('message.success'))
                        state.menuModelVisible = false
                    })
            },
            onAddOut() {
                state.menuInfoFormModel = {
                    pid: 0,
                    priority: 1,
                    component: 'layout/index'
                }
                onAddCommonHandle()
            }
        }
    }
})
</script>