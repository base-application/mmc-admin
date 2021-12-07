<template>
  <n-button class="mb-2" size="small" type="primary" @click="onAdd">{{ $t("button.add") }}</n-button>
  <n-data-table
    remote
    size="small"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    :pagination="paginationConfig"
  />
  <EntityModel
    v-model:visible="modelVisible"
    @update:visible="updateModelVisible"
    :data="currentRow"
    :type="operateType"
    @refesh="getTableData"
  />
  <!-- 编辑权限 -->
  <n-modal
    v-model:show="authModelVisible"
    preset="card"
    :title="$t('system.role.button.editApi')"
    :bordered="false"
    closable
  >
    <n-tree
      block-line
      :cascade="true"
      :checkable="true"
      :data="systemApiList"
      check-strategy="child"
      :checked-keys="roleApiList"
      label-field="name"
      key-field="id"
      @update:checked-keys="updateAuthCheckedKeys"
    />
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="updateAuth">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
  <!-- 编辑菜单 -->
  <n-modal
    v-model:show="menuModelVisible"
    preset="card"
    :title="$t('system.role.button.editMenu')"
    :bordered="false"
    closable
  >
    <n-tree
      block-line
      :cascade="false"
      :checkable="true"
      :data="systemMenuList"
      key-field="id"
      :checked-keys="roleMenuList"
      :default-expand-all="true"
      :render-label="renderMenuLabel"
      @update:checked-keys="updateMenuCheckedKeys"
    />
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="updateMenu">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
  <!-- 编辑按钮 -->
  <n-modal
    v-model:show="buttonModelVisible"
    preset="card"
    :title="$t('system.role.button.editButton')"
    :bordered="false"
    closable
  >
    <n-tree
      block-line
      :cascade="true"
      :checkable="true"
      :data="systemButtonList"
      :checked-keys="roleButtonList"
      key-field="buttonId"
      :render-label="({ option }) => `${option.modeName} -${option.name} -${option.buttonCode} `"
      @update:checked-keys="updateButtonCheckedKeys"
    />

    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="updateButton">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { h, defineComponent, reactive, toRefs } from 'vue'
import { NButton, useMessage, useDialog, PaginationInfo } from 'naive-ui'
import { netRoleList, netRoleDelete, netApiList, netRoleApi, netRoleApiConfig, netRoleMenu, netRoleMenuConfig, netRoleButton, netRoleButtonConfig } from "@/api/role"
import EntityModel from "./EntityModel.vue"
import { IRole } from '@/types/role'
import { netMenuList } from '@/api/menu'
import { netButtonList } from '@/api/button'
import { useI18n } from 'vue-i18n'

const createColumns = ({ t, onEditAuth, onEditMenu, onEditButton, onDelete }) => {
  return [
    {
      title: t("system.role.entity.id"),
      key: 'id',
      align: 'center'
    },
    {
      title: t("system.role.entity.name"),
      key: 'name',
      align: 'center'
    },
    {
      title: t('column.operate'),
      key: 'actions',
      align: 'center',
      width: 400,
      render(row: IRole) {
        return h(
          "div",
          {},
          [
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                onClick: () => onEditAuth(row)
              },
              { default: () => t("system.role.button.editApi") }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                onClick: () => onEditMenu(row)
              },
              { default: () => t("system.role.button.editMenu") }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                onClick: () => onEditButton(row)
              },
              { default: () => t("system.role.button.editButton") }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => onDelete(row)
              },
              { default: () => t("button.delete") }
            )
          ]

        )

      }
    }
  ]
}
export default defineComponent({
  components: { EntityModel },
  setup() {
    const { t } = useI18n()
    const message = useMessage()
    const dialog = useDialog()
    const state = reactive({
      tableData: [],
      modelVisible: false,
      currentRow: {},
      operateType: "add",
      authModelVisible: false,
      systemApiList: [],
      roleApiList: [],
      menuModelVisible: false,
      systemMenuList: [],
      roleMenuList: [],
      systemButtonList: [],
      roleButtonList: [],
      buttonModelVisible: false
    })
    const paginationConfig = reactive({
      itemCount: 0,
      prefix({ itemCount }: PaginationInfo) {
        return t('page.total',{ total:itemCount })
      }
    })
    const getTableData = () => {
      netRoleList()
        .then(res => {
          // const { list, total } = res.data
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
        })
    }
    const columns = createColumns({
      t,
      onEditAuth: (row: IRole) => {
        console.log("编辑权限")
        state.currentRow = row
        getSystemApiList()
        getRoleApiList(row.id)
        state.authModelVisible = true
      },
      onEditMenu: async (row: IRole) => {
        console.log("编辑菜单")
        state.currentRow = row
        await getSystemMenuList()
        await getRoleMenuList(row.id)
        state.menuModelVisible = true
      },
      onEditButton: (row: IRole) => {
        console.log("编辑按钮")
        state.currentRow = row
        getSystemButtonList()
        getRoleButtonList(row.id)
        state.buttonModelVisible = true
      },
      onDelete: (row: IRole) => {
        const { id } = row
        dialog.warning({
          title: '警告',
          content: '你确定要删除当前数据吗？此操作不可逆！',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            netRoleDelete({ id: id as number })
              .then(() => {
                message.success("删除成功")
                getTableData()
              })
          },
          onNegativeClick: () => {
            message.info('取消操作')
          }
        })
      }
    })
    const onAdd = () => {
      state.currentRow = {}
      state.operateType = "add"
      state.modelVisible = true
    }
    getTableData()
    const getSystemApiList = () => {
      netApiList()
        .then(res => {
          state.systemApiList = res.data.map(v => {
            v.disabled = false
            return v
          })
        })
    }
    const getRoleApiList = (roleId) => {
      netRoleApi({ roleId })
        .then(res => {
          state.roleApiList = res.data.map(v => v.id)
        })
    }
    const getSystemMenuList = () => {
      return new Promise((resolve) => {
        netMenuList()
          .then(res => {
            state.systemMenuList = res.data
            resolve()
          })
      })

    }
    const getRoleMenuList = (roleId) => {
      return new Promise((resolve) => {
        netRoleMenu({ roleId })
          .then(res => {
            state.roleMenuList = res.data.map(v => v.id)
            resolve()
          })
      })

    }
    const getSystemButtonList = () => {
      netButtonList({})
        .then(res => {
          state.systemButtonList = res.data
        })
    }
    const getRoleButtonList = (roleId) => {
      netRoleButton({ roleId })
        .then(res => {
          state.roleButtonList = res.data.map(v => v.buttonId)
        })
    }

    return {
      renderMenuLabel({ option }) {
        return t(option.name)
      },
      ...toRefs(state),
      columns,
      paginationConfig,
      getTableData,
      onAdd,
      updateAuth() {
        const { id } = state.currentRow as IRole
        netRoleApiConfig({ roleId: id as number, api: state.roleApiList })
          .then(() => {
            state.authModelVisible = false
            window.$message.success(t("message.success"))
          })
      },
      updateMenu() {
        const { id } = state.currentRow as IRole
        netRoleMenuConfig({ roleId: id as number, api: state.roleMenuList })
          .then(() => {
            state.menuModelVisible = false
            window.$message.success(t("message.success"))
          })
      },
      updateButton() {
        const { id } = state.currentRow as IRole
        netRoleButtonConfig({ roleId: id as number, api: state.roleButtonList })
          .then(() => {
            state.buttonModelVisible = false
            window.$message.success(t("message.success"))
          })
      },
      updateAuthCheckedKeys(keys) {
        state.roleApiList = keys
      },
      updateMenuCheckedKeys(keys) {
        console.log('CheckedKeys---', keys)
        // state.menuCheckedKeys = keys
        state.roleMenuList = keys
      },
      updateButtonCheckedKeys(keys) {
        state.roleButtonList = keys
      },
      updateModelVisible(value: boolean) {
        state.modelVisible = value
      }
    }
  }
})
</script>