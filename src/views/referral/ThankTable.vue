<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
    <n-form-item>
      <n-input
        clearable
        v-model:value="searchFormModel.name"
        :placeholder="$t('referral.search.name')"
      />
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
    </n-form-item>
    <n-form-item>
      <div>Total Value: MYR {{ totalValue || 0 }}</div>
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
</template>

<script lang="ts">
import { defineComponent, reactive, h, toRefs, ref } from 'vue'
import { NImage, NImageGroup, NTime } from "naive-ui"
import { netGroupList } from '@/api/group'
import { netThankList } from "@/api/thank"
import type { IGroup } from '@/types/group'
import type { IReferral, IReferralSearch } from "@/types/referral"
import type { IThank, IThankSearch } from '@/types/thank'
import { useI18n } from 'vue-i18n'
interface IState {
  tableData: IThank[]
  searchFormModel: IThankSearch
  groupList: IGroup[]
  totalValue: Nullable<number>
}
const baseUrl = import.meta.env.VITE_BASE_API
const createColumns = ({ t }) => {
  return [
    {
      title: t('referral.from'),
      align: "center",
      children: [
        {
          title: t('referral.thank.entity.group'),
          key: 'fromGroup',
          align: 'center'
        },
        {
          title: t('referral.thank.entity.sendTime'),
          key: 'sendTime',
          align: 'center',
          render(row: IReferral) {
            return h(
              NTime,
              {
                time: row.sendTime,
                type: "datetime"
              }
            )
          }
        },
        {
          title: t('referral.thank.entity.name'),
          key: 'fromName',
          align: 'center'
        },
        {
          title: t('referral.thank.entity.note'),
          key: 'note',
          align: 'center'
        },
        {
          title: t('referral.thank.entity.value'),
          key: 'value',
          align: 'center'
        },
        {
          title: t('referral.thank.entity.picture'),
          key: 'picture',
          align: 'center',
          render(row: IReferral) {
            return h(
              NImageGroup,
              {},
              {
                default: () => {
                  if (!row.picture || row.picture.length === 0) {
                    return ""
                  }
                  return row.picture.map((v, index) => {
                    return h(
                      NImage,
                      {
                        width: 100,
                        style: index > 0 ? { display: 'none' } : "",
                        src: `${baseUrl}/${v.url}`
                      }
                    )
                  })
                }
              }
            )
          }
        }
      ]
    },
    {
      title: t('referral.to'),
      align: 'center',
      children: [
        {
          title: t('referral.thank.entity.group'),
          key: 'toGroup',
          align: 'center'
        },
        {
          title: t('referral.thank.entity.name'),
          key: 'toName',
          align: 'center'
        }
      ]
    }
  ]
}

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const searchDate = ref<Nullable<number[]>>(null)
    const state = reactive<IState>({
      tableData: [],
      searchFormModel: {},
      groupList: [],
      totalValue: 0
    })
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
      },
      onPageSizeChange: (pageSize: number) => {
        paginationConfig.pageSize = pageSize
        paginationConfig.page = 1
      }
    })
    const handleSearchParams = (): IReferralSearch => {
      const params: IReferralSearch = {}
      console.log('state.searchFormModel---', state.searchFormModel)
      Object.keys(state.searchFormModel).forEach(k => {
        if (state.searchFormModel[k]) {
          params[k] = state.searchFormModel[k]
        }
      })
      params.page = paginationConfig.page
      params.size = paginationConfig.pageSize
      if (searchDate.value && searchDate.value.length > 0) {
        params.startTime = searchDate.value[0]
        params.endTime = searchDate.value[1]
      }
      return params
    }
    const getTableData = () => {
      netThankList(handleSearchParams())
        .then(res => {
          const { list: { list: tableList, total: tableTotal }, total } = res.data
          console.log(res)
          state.tableData = tableList
          state.totalValue = total
          paginationConfig.itemCount = tableTotal
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
    return {
      searchDate,
      paginationConfig,
      onSearch() {
        getTableData()
      },
      ...toRefs(state),
      columns: createColumns({ t })
    }
  }
})
</script>