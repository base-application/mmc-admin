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
    v-model:show="editModelVisible"
    preset="card"
    :title="$t('referral.referral.model.remark')"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form
        label-placement="left"
        :label-width="60"
        :model="referralInfoFormModel"
        size="small"
        :rules="rules"
        ref="remarkFrom"
      >
        <n-form-item :label="$t('referral.referral.model.remark')" path="remark">
          <n-input clearable type="textarea" v-model:value="referralInfoFormModel.remark" />
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="referralRemark">{{ $t('button.submit') }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, h, toRefs, ref } from 'vue'
import { NButton, NImage, NImageGroup, NTime } from "naive-ui"
import { netReferralList, netReferralRemark } from "@/api/referral"
import { netGroupList } from '@/api/group'
import type { IGroup } from '@/types/group'
import type { IReferral, IReferralSearch, IReferralUpdate } from "@/types/referral"
import { useI18n } from 'vue-i18n'
interface IState {
  tableData: IReferral[],
  searchFormModel: IReferralSearch,
  groupList: IGroup[],
  editModelVisible: boolean,
  referralInfoFormModel: IReferralUpdate
}
interface ICreateColumns {
  onRemark(row: IReferral): void
  t(string: string): void
}
const referralStatus = {
  1: '发送',
  2: '接收成功',
  3: '接收失败'
}
const baseUrl = import.meta.env.VITE_BASE_API
const createColumns = ({ onRemark, t }: ICreateColumns) => {
  return [
    {
      title: t('referral.from'),
      align: "center",
      children: [
        {
          title: t('referral.referral.entity.group'),
          key: 'fromGroup',
          align: 'center'
        },
        {
          title: t('referral.referral.entity.sendTime'),
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
          title: t('referral.referral.entity.name'),
          key: 'fromName',
          align: 'center'
        },
        {
          title: t('referral.referral.entity.reason'),
          key: 'reason',
          align: 'center'
        },
        {
          title: t('referral.referral.entity.picture'),
          key: 'picture',
          align: 'center',
          render(row: IReferral) {
            return h(
              NImageGroup,
              {},
              {
                default: () => {
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
          title: t('referral.referral.entity.group'),
          key: 'toGroup',
          align: 'center'
        },
        {
          title: t('referral.referral.entity.name'),
          key: 'toName',
          align: 'center'
        }
      ]
    },
    {
      title: t('referral.referral.entity.sendTime'),
      key: 'receivedTime',
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
      title: t('referral.referral.entity.status'),
      key: 'status',
      align: 'center',
      render(row: IReferral) {
        return referralStatus[row.status]
      }
    },
    {
      title: t('referral.referral.entity.remark'),
      key: 'remark',
      align: 'center'
    },
    {
      title: t('column.operate'),
      key: 'thankYouNote',
      align: 'center',
      width: 200,
      render(row: IReferral) {
        return h(
          "div",
          {},
          [
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                onClick: () => onRemark(row)
              },
              {
                default: () => t('referral.referral.entity.remark')
              }
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
    const searchDate = ref<Nullable<number[]>>(null)
    const state = reactive<IState>({
      tableData: [],
      searchFormModel: {},
      groupList: [],
      editModelVisible: false,
      referralInfoFormModel: {}
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
        getTableData()
      },
      onPageSizeChange: (pageSize: number) => {
        paginationConfig.pageSize = pageSize
        paginationConfig.page = 1
        getTableData()
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
      netReferralList(handleSearchParams())
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
    const remarkFrom = ref()
    return {
      rules: {
        remark: {
          required: true,
          message: '请输入',
          validator(_rule, value){
            if (value.trim() === ''){
              return new Error('请输入')
            }
            if (value.length > 200) {
              return new Error('最多输入200字')
            }
            return true
          }
        }
      },
      remarkFrom,
      searchDate,
      paginationConfig,
      onSearch() {
        getTableData()
      },
      ...toRefs(state),
      columns: createColumns({
        t,
        onRemark(row) {
          const { remark, referralId } = row
          state.referralInfoFormModel = { remark, referralId }
          state.editModelVisible = true
        }
      }),
      referralRemark() {
        remarkFrom.value.validate((errors) => {
          if (!errors) {
            netReferralRemark(state.referralInfoFormModel)
              .then(() => {
                window.$message.success(t("message.success"))
                getTableData()
                state.editModelVisible = false
              })
          }
        })

      }
    }
  }
})
</script>