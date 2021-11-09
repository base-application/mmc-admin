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
  <EntityModel
    v-model:visible="modelVisible"
    @update:visible="updateModelVisible"
    :data="currentRow"
    :type="operateType"
    @refesh="getTableData"
  />
  <n-modal
    v-model:show="roleModelVisible"
    preset="card"
    :title="$t('model.edit')"
    :bordered="false"
    closable
  >
    <n-checkbox-group v-model:value="userRoles">
      <n-space vertical>
        <n-checkbox v-for="role in systemRoles" :key="role.id" :value="role.id" :label="role.name" />
      </n-space>
    </n-checkbox-group>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="updateUserRole">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { h, defineComponent, reactive, toRefs } from 'vue'
import { NButton, NSwitch } from 'naive-ui'
import { netUserList, netUserRole, netUserAdd, netUserRoleUpdate, netUserEnable } from "@/api/user"
import { netRoleList } from "@/api/role"
import EntityModel from "./EntityModal.vue"
import { dateFilter } from "@/utils/filters"
import { IRole } from '@/types/role'
import { useI18n } from 'vue-i18n'

const createColumns = ({ onEditRole, t }) => {
  return [
    {
      title: t('system.user.entity.id'),
      key: 'id',
      align: 'center'
    },
    {
      title: t('system.user.entity.loginName'),
      key: 'loginName',
      align: 'center'
    },
    {
      title: t('system.user.entity.expiredTime'),
      key: 'expiredTime',
      align: 'center',
      render(row) {
        return dateFilter(row.expiredTime)
      }
    },
    {
      title: t('system.user.entity.credentialsExpiredTime'),
      key: 'credentialsExpiredTime',
      align: 'center',
      render(row) {
        return dateFilter(row.credentialsExpiredTime)
      }
    },
    {
      title: t('system.user.entity.locked'),
      key: 'locked',
      align: 'center',
      render(row) {
        return h(
          NSwitch,
          {
            size: 'small',
            value: row.locked,
            onUpdateValue: (value) => {
              netUserAdd({
                id: row.id,
                locked: value
              }).then(() => {
                row.locked = value
                window.$message.success(t("message.success"))
              })
            }
          }
        )
      }
    },
    {
      title: t('system.user.entity.enable'),
      key: 'enable',
      align: 'center',
      render(row) {
        return h(
          NSwitch,
          {
            size: 'small',
            value: row.enable,
            onUpdateValue: (value) => {
              netUserEnable({
                id: row.id,
                enable: value
              }).then(() => {
                row.enable = value
                window.$message.success(t("message.success"))
              })
            }
          }
        )
      }
    },
    {
      title: t('column.operate'),
      key: 'actions',
      align: 'center',
      width: 200,
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
                onClick: () => onEditRole(row)
              },
              () => t("button.edit")
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
    const state = reactive<{
      systemRoles: IRole[]
      currentRow: IRole
      tableData: IRole[]
      modelVisible: boolean
      operateType: string
      roleModelVisible: boolean
      userRoles: number[]
    }>({
      tableData: [],
      modelVisible: false,
      currentRow: {},
      operateType: "add",
      roleModelVisible: false,
      systemRoles: [],
      userRoles: []
    })
    const paginationConfig = reactive({
      page: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      showSizePicker: true,
      itemCount: 0,
      prefix({ itemCount }) {
        return t('page.total',{ total:itemCount })
      },
      onChange: (page) => {
        paginationConfig.page = page
        getTableData()
      },
      onPageSizeChange: (pageSize) => {
        paginationConfig.pageSize = pageSize
        paginationConfig.page = 1
        getTableData()
      }
    })
    const getTableData = () => {
      const pageParams = {
        page: paginationConfig.page,
        size: paginationConfig.pageSize
      }
      netUserList(pageParams)
        .then(res => {
          const { list, total } = res.data
          state.tableData = list
          paginationConfig.itemCount = total
        })
    }
    const columns = createColumns({
      t,
      onEditRole: (row) => {
        state.currentRow = row
        state.roleModelVisible = true
        getUserRoleList({ userId: row.id })
      }
    })
    const updateUserRole = () => {
      const { id } = state.currentRow as IRole
      netUserRoleUpdate({ userId: id as number, roles: state.userRoles })
        .then(() => {
          state.roleModelVisible = false
          window.$message.success(t("message.success"))
        })
    }
    const onAdd = () => {
      state.currentRow = {}
      state.operateType = "add"
      state.modelVisible = true
    }
    const getUserRoleList = (params) => {
      netUserRole(params)
        .then(res => {
          state.userRoles = res.data.map(r => r.id)
        })
    }
    const getSystemRoleList = () => {
      netRoleList()
        .then(res => {
          state.systemRoles = res.data
        })
    }
    getSystemRoleList()
    getTableData()
    return {
      ...toRefs(state),
      columns,
      paginationConfig,
      getTableData,
      onAdd,
      updateUserRole,
      updateModelVisible(value: boolean) {
        state.modelVisible = value
      }
    }
  }
})
</script>