<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
    <n-form-item>
      <n-input clearable v-model:value="searchFormModel.title" :placeholder="$t('notification.entity.notificationTitle')" />
    </n-form-item>
    <n-form-item>
      <n-select
        clearable
        style="width: 200px"
        :placeholder="$t('placeholder.group')"
        :options="groupList"
        v-model:value="searchFormModel.groupId"
      />
    </n-form-item>
    <n-form-item>
      <n-date-picker v-model:value="searchDate" type="daterange" clearable />
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
    :pagination="paginationConfig"
  />
  <n-modal
    v-model:show="notificationModelVisible"
    preset="card"
    :title="notificationFormModel.notificationId ? $t('model.edit') : $t('model.add')"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form label-placement="left" :label-width="200" :model="notificationFormModel" size="small">
        <n-form-item :label="$t('notification.entity.notificationTitle')">
          <n-input clearable v-model:value="notificationFormModel.notificationTitle" />
        </n-form-item>
        <n-form-item :label="$t('notification.entity.grades')">
          <n-select
            clearable
            multiple
            :options="memberShipList"
            v-model:value="notificationFormModelMembership"
          />
        </n-form-item>
        <n-form-item :label="$t('notification.entity.groups')">
          <n-select
            clearable
            multiple
            :options="groupList"
            v-model:value="notificationFormModelGroup"
          />
        </n-form-item>
        <n-form-item :label="$t('notification.entity.notificationType')">
          <n-select
            clearable
            :options="typeList"
            v-model:value="notificationFormModel.notificationType"
          />
        </n-form-item>
        <n-form-item :label="$t('notification.entity.notificationContent')">
          <WfrEditor v-model:value="notificationFormModel.notificationContent" />
        </n-form-item>
        <n-form-item :label="$t('notification.entity.registrationName')">
          <n-input clearable v-model:value="notificationFormModel.registrationName" />
        </n-form-item>
        <n-form-item :label="$t('notification.entity.registrationLink')">
          <n-input clearable v-model:value="notificationFormModel.registrationLink" />
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
import { defineComponent, reactive, h, toRefs } from 'vue'
import { NButton, NTime, useDialog } from "naive-ui"
import { netNotificationAdd, netNotificationDelete, netNotificationList, netNotificationTypeList } from '@/api/notification'
import { netGroupList } from '@/api/group'
import type { IGroup, IGroupOption } from '@/types/group'
import { INotification, INotificationInfo, INotificationSearch, INotificationType, INotificationTypeOption } from '@/types/notification'
import { IGradeOption } from '@/types/grade'
import { netMemberShipList } from '@/api/memberShip'
import { IMemberShip } from '@/types/memberShip'
import { dialogDelete } from '@/utils/common'
import WfrEditor from "@/components/Editor/index.vue"
import { useI18n } from 'vue-i18n'
interface IState {
  tableData: INotification[],
  searchFormModel: INotificationSearch,
  groupList: IGroupOption[],
  notificationModelVisible: boolean,
  notificationFormModel: INotificationInfo,
  memberShipList: IGradeOption[],
  notificationFormModelMembership: IMemberShip["gradeId"][],
  notificationFormModelGroup: number[]
  typeList: INotificationTypeOption[]
  searchDate: Nullable<number[]>
}
interface ICreateColumns {
  onEdit(row: INotification): void
  onDelete(row: INotification): void
  renderType(row: INotification): INotificationType['name']
  t(s: string): void
}
const createColumns = ({ onEdit, onDelete, renderType, t }: ICreateColumns) => {
  return [
    {
      title: t("notification.entity.notificationTime"),
      key: "notificationTime",
      align: "center",
      render(row: INotification) {
        return h(
          NTime,
          {
            time: row.notificationTime,
            format: "yyyy-MM-dd HH:mm:ss"
          }
        )
      }
    },
    {
      title: t("notification.entity.notificationTitle"),
      key: "notificationTitle",
      align: "center"
    },
    {
      title: t("notification.entity.grades"),
      key: "grades",
      align: "center",
      render(row: INotification) {
        return row.grades.map(v => {
          return h(
            'div',
            {},
            { default: () => v.gradeName }
          )
        })
      }
    },
    {
      title: t("notification.entity.groups"),
      key: "groups",
      align: "center",
      render(row: INotification) {
        return row.groups.map(v => {
          return h(
            'div',
            {},
            { default: () => v.groupName }
          )
        })
      }
    },
    {
      title: t("notification.entity.notificationType"),
      key: "notificationType",
      align: "center",
      render(row: INotification) {
        return renderType(row)
      }
    },
    {
      title: t("notification.entity.notificationContent"),
      key: "notificationContent",
      align: "center"
    },
    {
      title: t('column.operate'),
      key: 'thankYouNote',
      align: 'center',
      width: 200,
      render(row: INotification) {
        return h(
          "div",
          {},
          [
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                onClick: () => onEdit(row)
              },
              {
                default: () => "Edit"
              }
            ),
            h(
              NButton,
              {
                size: "small",
                type: "error",
                onClick: () => onDelete(row)
              },
              {
                default: () => "Deiete"
              }
            )
          ]
        )
      }
    }
  ]
}

export default defineComponent({
  components: { WfrEditor },
  setup() {
    const { t } = useI18n()
    const dialog = useDialog()
    const state = reactive<IState>({
      tableData: [],
      searchFormModel: {},
      groupList: [],
      notificationModelVisible: false,
      notificationFormModel: {},
      memberShipList: [],
      searchDate: null,
      notificationFormModelGroup: [],
      notificationFormModelMembership: [],
      typeList: []
    })
    const paginationConfig = reactive({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 20, 30],
      itemCount: 0,
      prefix: ({ itemCount }) => {
        return t('page.total',{ total:itemCount })
      },
      onChange: (page: number) => {
        paginationConfig.page = page
        getTableData()
      },
      onPageSizeChange: (pageSize: number) => {
        paginationConfig.pageSize = pageSize
        paginationConfig.page = 1
        getTableData()
      }
    })
    const handleSearchParams = (): INotificationSearch => {
      const params: INotificationSearch = {}
      Object.keys(state.searchFormModel).forEach(k => {
        if (state.searchFormModel[k]) {
          params[k] = state.searchFormModel[k]
        }
      })
      params.page = paginationConfig.page
      params.size = paginationConfig.pageSize
      if (state.searchDate && state.searchDate.length > 0) {
        params.startTime = state.searchDate[0]
        params.endTime = state.searchDate[1]
      }
      return params
    }
    const getTableData = () => {
      netNotificationList(handleSearchParams())
        .then(res => {
          const { list, total } = res.data
          console.log(res)
          state.tableData = list
          paginationConfig.itemCount = total
        })
    }
    getTableData()
    const getMembershipData = () => {
      netMemberShipList()
        .then(res => {
          state.memberShipList = res.data.map((v: IMemberShip) => {
            return {
              label: v.gradeName,
              value: v.gradeId
            }
          })
        })
    }
    getMembershipData()
    const getNotificationTypeList = () => {
      netNotificationTypeList()
        .then(res => {
          state.typeList = res.data.map((v: INotificationType) => {
            return {
              label: v.name,
              value: v.id
            }
          })
        })
    }
    getNotificationTypeList()

    const getGroupData = () => {
      netGroupList()
        .then(res => {
          state.groupList = res.data.map((v: IGroup) => {
            return {
              label: v.groupName,
              value: v.groupId
            }
          })
        })
    }
    getGroupData()
    return {
      paginationConfig,
      onSearch() {
        getTableData()
      },
      ...toRefs(state),
      columns: createColumns({
        t,
        onEdit(row) {
          state.notificationFormModelGroup = row.groups.map((v: IGroup) => v.groupId)
          state.notificationFormModelMembership = row.grades.map((v: IMemberShip) => v.gradeId)
          state.notificationFormModel = JSON.parse(JSON.stringify(row))
          state.notificationModelVisible = true
        },
        onDelete(row) {
          console.log(row)
          dialogDelete(dialog, () => {
            netNotificationDelete({ id: row.notificationId })
              .then(() => {
                getTableData()
                window.$message.success(t("message.success"))
              })
          })
        },
        renderType(row) {
          const type = state.typeList.find(v => v.value === row.notificationType)
          return type?.label as string
        }
      }),
      onSubmit() {
        const grades: IMemberShip[] = state.memberShipList.filter((v) => state.notificationFormModelMembership.includes(v.value)).map((v: IGroupOption) => {
          return {
            gradeId: v.value,
            gradeName: v.label
          }
        })
        const groups: IGroup[] = state.groupList.filter((v: IGroupOption) => state.notificationFormModelGroup.includes(v.value)).map((v: IGroupOption) => {
          return {
            groupId: v.value,
            groupName: v.label
          }
        })
        state.notificationFormModel.grades = grades
        state.notificationFormModel.groups = groups
        netNotificationAdd(state.notificationFormModel)
          .then(() => {
            getTableData()
            window.$message.success(t("message.success"))
            state.notificationModelVisible = false
          })
      },
      onAdd() {
        state.notificationFormModel = {}
        state.notificationFormModelGroup = []
        state.notificationFormModelMembership = []
        state.notificationModelVisible = true
      }
    }
  }
})
</script>