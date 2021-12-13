<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
    <n-form-item>
      <n-input
        clearable
        v-model:value="searchFormModel.eventTitle"
        :placeholder="$t('event.entity.eventTitle')"
      />
    </n-form-item>
    <n-form-item>
      <n-select
        clearable
        style="width: 200px"
        :placeholder="$t('event.entity.group')"
        :options="groupList"
        v-model:value="searchFormModel.groupId"
      />
    </n-form-item>
    <n-form-item>
      <n-date-picker v-model:value="searchDate" type="daterange" clearable placeholder="Date" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" size="small" @click="onSearch">{{ $t('button.search') }}</n-button>
      <n-button type="primary" size="small" @click="onCreate">{{ $t('button.add') }}</n-button>
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
    v-model:show="eventModelVisible"
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
        :model="eventFormModel"
        size="small"
        :rules="rules"
        ref="formRef"
      >
        <n-form-item :label="$t('event.entity.eventTitle')" path="eventTitle">
          <n-input clearable v-model:value="eventFormModel.eventTitle" />
        </n-form-item>
        <n-form-item :label="$t('event.entity.group')">
          <n-select clearable multiple :options="groupList" v-model:value="eventFormModelGroups" />
        </n-form-item>
        <n-form-item :label="$t('event.entity.grade')">
          <n-select clearable multiple :options="gradeList" v-model:value="eventFormModelGrades" />
        </n-form-item>
        <n-form-item :label="$t('event.entity.eventDescription')" path="eventDescription">
          <n-input
            maxlength="200"
            show-count
            clearable
            v-model:value="eventFormModel.eventDescription"
            type="textarea"
          />
        </n-form-item>
        <n-form-item :label="$t('event.entity.eventStartTime')" path="eventStartTime">
          <n-date-picker v-model:value="eventFormModel.eventStartTime" type="datetime" clearable />
        </n-form-item>
        <n-form-item :label="$t('event.entity.eventEndTime')" path="eventEndTime">
          <n-date-picker v-model:value="eventFormModel.eventEndTime" type="datetime" clearable />
        </n-form-item>
        <n-form-item :label="$t('event.entity.eventLocation')">
          <n-input clearable v-model:value="eventFormModel.eventLocation" />
        </n-form-item>
        <n-form-item :label="$t('event.entity.eventMapLink')">
          <n-input clearable v-model:value="eventFormModel.eventMapLink" />
        </n-form-item>
        <n-form-item :label="$t('event.entity.poster')">
          <UploadImageMultiple
            list-type="image-card"
            showFileList
            multiple
            :default-file-list="defaultImageList"
            @finish="uploadImageFinish"
            @remove="uploadImageRemove"
          >✛</UploadImageMultiple>
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
  <n-drawer v-model:show="listingDrawerVisible" placement="top" height="100vh">
    <n-drawer-content closable :title="currentRow?.eventTitle">
      <Listing />
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, h, toRefs, computed, provide, ref } from 'vue'
import { NButton, NTime, useDialog } from "naive-ui"
import { netEventAdd, netEventApprove, netEventDelete, netEventList } from "@/api/event"
import { netGroupList } from '@/api/group'
import Listing from "./listing/index.vue"
import type { IGroup, IGroupOption } from '@/types/group'
import type { IEvent, IEventAdd, IEventSearch } from '@/types/event'
import { EApproveStatus } from '@/types/event'
import { useI18n } from 'vue-i18n'
import { IGrade2, IGrade2Option } from '@/types/grade'
import { netMemberShipList } from '@/api/memberShip'
import UploadImageMultiple from '@/components/UploadImageMultiple/index.vue'
import { dialogDelete, ImageAddBaseUrl } from '@/utils/common'
enum EModelType {
  add = "add",
  edit = "edit",
}

interface IState {
  eventModelVisible: boolean
  eventFormModel: IEventAdd | IEvent
  tableData: IEvent[]
  modelType: EModelType
  eventFormModelGroups: IGroup["groupId"][]
  eventFormModelGrades: IGrade2['gradeId'][]
  groupList: IGroupOption[]
  defaultImageList: { url: string }[]
  searchDate: Nullable<number[]>
  searchFormModel: IEventSearch
  listingDrawerVisible: boolean
  currentRow: Nullable<IEvent>,
  gradeList: IGrade2Option[],
}
interface ICreateColumns {
  onSwitchApprove(row: IEvent, status: EApproveStatus): void
  onEdit(row: IEvent): void
  onListing(row: IEvent): void
  t(s: string): void
  onDelete(row: IEvent): void
}
const baseUrl = import.meta.env.VITE_BASE_API + '/'
const createColumns = ({ onSwitchApprove, onEdit, onListing, t, onDelete }: ICreateColumns) => {
  return [
    {
      title: t('event.column.date'),
      key: "eventStartTime",
      align: 'center',
      render(row: IEvent) {
        return h(
          NTime,
          {
            time: row.eventStartTime as number,
            type: "datetime"
          }
        )
      }
    },
    {
      title: t('event.entity.group'),
      key: "groups",
      align: 'center',
      render(row: IEvent) {
        return row.groups.map(g => {
          return h(
            'div',
            {},
            {
              default: () => {
                return g.groupName
              }
            }
          )
        })
      }
    },
    {
      title: t('event.entity.eventTitle'),
      key: "eventTitle",
      align: 'center'
    },
    {
      title: t('event.entity.eventLocation'),
      key: "eventLocation",
      align: 'center'
    },
    {
      title: t('event.column.list'),
      align: 'center',
      width: 160,
      render(row: IEvent) {
        return h(
          'div',
          {
            style: 'cursor:pointer',
            onclick: () => onListing(row)
          },
          {
            default: () => {
              return t('event.column.listContent')
            }
          }
        )
      }
    },
    {
      title: t('event.column.attendance'),
      key: "attendanceProportion",
      align: 'center',
      width: 200,
      render(row: IEvent) {
        return `${(row.attendanceProportion * 100)}%`
      }
    },
    {
      title: t('column.operate'),
      align: 'center',
      width: 320,
      render(row: IEvent) {
        const approveNode = h(
          NButton,
          {
            size: "small",
            type: "primary",
            onClick: () => onSwitchApprove(row, 2)
          },
          {
            default: () => t('event.button.approve')
          }
        )
        const disApproveNode = h(
          NButton,
          {
            size: "small",
            type: "primary",
            onClick: () => onSwitchApprove(row, 3)
          },
          {
            default: () => t('event.button.disApprove')
          }
        )
        const editNode = h(
          NButton,
          {
            size: "small",
            type: "primary",
            onClick: () => onEdit(row)
          },
          {
            default: () => t('button.edit')
          }
        )
        const deleteNode = h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => onDelete(row)
          },
          {
            default: () => t('button.delete')
          }
        )
        if (row.approveStatus === EApproveStatus.noHandle || !row.approveStatus) {
          return [approveNode, disApproveNode, editNode, deleteNode]
        } else {
          if (row.approveStatus === EApproveStatus.agree) {
            return [disApproveNode, editNode, deleteNode]
          } else if (row.approveStatus === EApproveStatus.refuse) {
            return [approveNode, editNode, deleteNode]
          }
        }
      }
    }
  ]
}

export default defineComponent({
  components: { Listing, UploadImageMultiple },
  setup() {
    const { t } = useI18n()
    const dialog = useDialog()
    const state = reactive<IState>({
      currentRow: null,
      searchDate: null,
      defaultImageList: [],
      eventFormModelGroups: [],
      eventFormModelGrades: [],
      modelType: EModelType.add,
      eventModelVisible: false,
      eventFormModel: {},
      tableData: [],
      searchFormModel: {},
      groupList: [],
      listingDrawerVisible: false,
      gradeList: []
    })
    provide("eventId", computed(() => {
      return state.currentRow?.eventId
    }))
    provide("groups", computed(() => {
      return state.currentRow?.groups
    }))
    const paginationConfig = reactive({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 20, 30],
      itemCount: 0,
      prefix: ({ itemCount }) => {
        return t('page.total', { total: itemCount })
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
    const handleSearchParams = (): IEventSearch => {
      const params: IEventSearch = {}
      console.log('state.searchFormModel---', state.searchFormModel)
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
      netEventList(handleSearchParams())
        .then(res => {
          const { list, total } = res.data
          console.log(res)
          state.tableData = list
          paginationConfig.itemCount = total
        })
    }
    getTableData()
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
    const getGradeData = () => {
      netMemberShipList()
        .then(res => {
          state.gradeList = res.data.map((v: IGrade2) => {
            return {
              label: v.gradeName,
              value: v.gradeId
            }
          })
        })
    }
    getGradeData()
    const formRef = ref()
    return {
      formRef,
      rules: {
        eventTitle: {
          required: true,
          message: " "
        },
        eventDescription: {
          required: true,
          message: " "
        },
        eventStartTime: {
          required: true,
          message: " "
        },
        eventEndTime: {
          required: true,
          message: " "
        }
      },
      modelTitle: computed(() => {
        return {
          add: '创建活动',
          edit: '编辑活动'
        }[state.modelType]
      }),
      paginationConfig,
      onSearch() {
        paginationConfig.page = 1
        getTableData()
      },
      ...toRefs(state),
      columns: createColumns({
        onDelete(row) {
          dialogDelete(dialog, () => {
            netEventDelete({ id: row.eventId})
            .then(() => {
              window.$message.success(t("message.success"))
              getTableData()
            })
          })
        },
        t,
        onEdit(row) {
          state.modelType = EModelType.edit
          console.log('row.eventPoster---', row.eventPoster)
          const tempEventPoster = JSON.parse(JSON.stringify(row.eventPoster))
          // state.defaultImageList = tempEventPoster.map(v => {
          //   v.url = `${baseUrl}${v.url}`
          //   v.id = `${baseUrl}${v.url}`
          //   // v.url = v.url.match(/image.*/)[0]
          //   return v
          // })
          state.defaultImageList = tempEventPoster.map(v => {
            return {
              ...v,
              status: 'finished',
              name: v.url,
              url: ImageAddBaseUrl(v.url)
            }
          })
          state.eventFormModelGroups = row.groups.map(v => v.groupId)
          state.eventFormModelGrades = row.grades.map(v => v.gradeId)
          state.eventFormModel = JSON.parse(JSON.stringify(row))
          state.eventModelVisible = true
        },
        onSwitchApprove(row, approveStatus) {
          console.log(row)
          const { eventId } = row
          netEventApprove({ eventId, approveStatus })
            .then(() => {
              getTableData()
              window.$message.success(t("message.success"))
            })
        },
        onListing(row) {
          console.log(row)
          state.currentRow = row
          state.listingDrawerVisible = true
        }
      }),
      onCreate() {
        state.defaultImageList = []
        state.eventFormModelGroups = []
        state.eventFormModelGrades = []
        state.eventFormModel = {}
        state.eventModelVisible = true
      },
      onSubmit() {
        state.eventFormModel.groups = state.groupList.filter(g => {
          return state.eventFormModelGroups.includes(g.value)
        }).map(v => {
          return {
            groupId: v.value,
            groupName: v.label
          }
        })
        state.eventFormModel.grades = state.gradeList.filter(g => {
          return state.eventFormModelGrades.includes(g.value)
        }).map(v => {
          return {
            gradeId: v.value,
            gradeName: v.label
          }
        })
        if (state.eventFormModel.eventPoster) {
          state.eventFormModel.eventPoster = state.eventFormModel.eventPoster.map(v => {
            v.url = v.url.replace(baseUrl, "")
            return v
          })
        }
        if (!(state.eventFormModel.eventPoster && state.eventFormModel.eventPoster.length > 0)) {
          window.$message.error('请上传图片')
          return
        }
        formRef.value.validate((errors) => {
          if (!errors) {
            netEventAdd(state.eventFormModel)
              .then(() => {
                getTableData()
                state.eventModelVisible = false
                window.$message.success(t("message.success"))
              })
          }
        })

      },
      uploadImageFinish(url: string) {
        if (state.eventFormModel.eventPoster && state.eventFormModel.eventPoster.length) {
          state.eventFormModel.eventPoster.push({ url })
        } else {
          state.eventFormModel.eventPoster = [{ url }]
        }
      },
      uploadImageRemove(file) {
        const { id, url } = file
        state.eventFormModel.eventPoster = state.eventFormModel.eventPoster?.filter(v => {
          return v.id !== id && v.url !== url
        })
      }
    }
  }
})
</script>