<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
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
      <n-date-picker
        v-model:value="searchDate"
        type="daterange"
        clearable
        :shortcuts="rangeShortcuts()"
      />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" size="small" @click="onSearch">{{ $t('button.search') }}</n-button>
    </n-form-item>
  </n-form>
  <n-data-table
    remote
    size="small"
    maxHeight="calc(100vh - 270px)"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    :pagination="paginationConfig"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, h, toRefs, inject, Ref } from 'vue'
import { NCheckbox } from "naive-ui"
import { netEventAttendance, netEventFacebookComment } from '@/api/event'
import type { IGroup, IGroupOption } from '@/types/group'
import { IEventAttendance, IEventAttendanceSearch } from '@/types/event'
import { DateRangeShortcuts } from '@/utils/common'
import { useI18n } from 'vue-i18n'
interface IState {
  tableData: IEventAttendance[],
  searchDate: Nullable<number[]>
  searchFormModel: IEventAttendanceSearch,
  groupList: IGroupOption[],
}
interface ICreateColumns {
  onCheck(row: IEventAttendance, checked: boolean): void
  t(s: string): void
}
const createColumns = ({ onCheck, t }: ICreateColumns) => {
  return [
    {
      title: t('event.list.entity.name'),
      key: 'name',
      align: 'center'
    },
    {
      title: t('event.list.entity.gradeName'),
      key: 'gradeName',
      align: 'center'
    },
    {
      title: t('event.list.entity.concatNumber'),
      key: 'concatNumber',
      align: 'center'
    },
    {
      title: t('event.list.entity.comment'),
      key: 'facebookComment',
      align: 'center',
      render: (row: IEventAttendance) => {
        return h(
          NCheckbox,
          {
            checked: row.facebookComment,
            onUpdateChecked: (checked: boolean) => {
              row.facebookComment = checked
              onCheck(row, checked)
            }
          }
        )
      }
    }
  ]
}

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const eventId = inject("eventId") as Ref<number>
    const groups = inject("groups") as Ref<IGroup[]>
    const state = reactive<IState>({
      tableData: [],
      searchDate: null,
      searchFormModel: {
        id: eventId.value
      },
      groupList: groups.value.map(v => {
        return {
          label: v.groupName,
          value: v.groupId
        }
      })
    })
    const paginationConfig = reactive({
      page: 1,
      pageCount: 1,
      itemCount: 0,
      prefix: ({ itemCount }) => {
        return t('page.total',{ total:itemCount })
      }
    })
    const handleSearchParams = (): IEventAttendanceSearch => {
      const params: IEventAttendanceSearch = {
        id: eventId.value
      }
      Object.keys(state.searchFormModel).forEach(k => {
        if (state.searchFormModel[k]) {
          params[k] = state.searchFormModel[k]
        }
      })
      if (state.searchDate && state.searchDate.length > 0) {
        params.startTime = state.searchDate[0]
        params.endTime = state.searchDate[1]
      }
      return params
    }
    const getTableData = () => {
      netEventAttendance(handleSearchParams())
        .then(res => {
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
        })
    }
    getTableData()
    return {
      paginationConfig,
      onSearch() {
        getTableData()
      },
      ...toRefs(state),
      columns: createColumns({
        t,
        onCheck(row, checked) {
          console.log(row)
          const { userId, eventId } = row
          netEventFacebookComment({
            userId, eventId, facebookComment: checked
          }).then(() => {
            window.$message.success(t("message.success"))
          }).catch(() => {
            row.facebookComment = !checked
          })
        }
      }),
      rangeShortcuts() {
        const shortcuts = DateRangeShortcuts()
        return {
          'today': shortcuts.today,
          'yesterday': shortcuts.yesterday,
          'Last 7 days': shortcuts.Last7days,
          'Last 14 days': shortcuts.Last14days,
          'Last 30 days': shortcuts.Last30days,
          'This week': shortcuts.Thisweek,
          'Last week': shortcuts.Lastweek,
          'This month': shortcuts.Thismonth,
          'Last month': shortcuts.Lastmonth
        }
      }
    }
  }
})
</script>