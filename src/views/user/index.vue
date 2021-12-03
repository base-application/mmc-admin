<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
    <n-form-item>
      <n-input
        clearable
        v-model:value="searchFormModel.name"
        :placeholder="$t('user.placeholder.name')"
      />
    </n-form-item>
    <n-form-item>
      <n-select
        clearable
        style="width: 200px"
        :placeholder="$t('placeholder.grade')"
        :options="gradeList"
        v-model:value="searchFormModel.positionId"
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
    :title="$t('model.edit')"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form label-placement="left" :label-width="200" :model="userInfoFormModel" size="small">
        <n-form-item :label="$t('user.entity.picture')">
          <UploadImage @on-finish="(url) => { userInfoFormModel.picture = url }">
            <n-icon size="100" v-if="!userInfoFormModel.picture" color="#0e7a0d">
              <PersonCircleSharp />
            </n-icon>
            <n-avatar
              v-else
              :size="150"
              :src="`${baseUrl}/${userInfoFormModel.picture}`"
              fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
          </UploadImage>
        </n-form-item>
        <n-form-item :label="$t('user.entity.name')">
          <n-input clearable v-model:value="userInfoFormModel.name" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.gradeId')">
          <n-select clearable :options="memberShipList" v-model:value="userInfoFormModel.gradeId" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.groupId')">
          <n-select clearable :options="groupList" v-model:value="userInfoFormModel.groupId" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.positionId')">
          <n-select clearable :options="gradeList" v-model:value="userInfoFormModel.positionId" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.member')">
          <n-select clearable :options="memberOptions" v-model:value="userInfoFormModel.member" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.concatNumber')">
          <n-input clearable v-model:value="userInfoFormModel.concatNumber" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.industry')">
          <n-input clearable v-model:value="userInfoFormModel.industry" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.country')">
          <n-select
            filterable
            clearable
            :options="countryOptions"
            v-model:value="userInfoFormModel.country"
            @update:value="getStateData()"
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.state')">
          <n-select
            filterable
            clearable
            :options="stateOptions"
            v-model:value="userInfoFormModel.state"
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.attendance')">
          <n-input-number
            clearable
            disabled
            :show-button="false"
            v-model:value="userInfoFormModel.attendance"
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.referralSend')">
          <n-input-number
            clearable
            disabled
            :show-button="false"
            v-model:value="userInfoFormModel.referralSend"
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.referralReceived')">
          <n-input-number
            clearable
            disabled
            :show-button="false"
            v-model:value="userInfoFormModel.referralReceived"
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.thankYouNote')">
          <n-input-number
            clearable
            disabled
            :show-button="false"
            v-model:value="userInfoFormModel.thankYouNote"
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.birthday')">
          <n-date-picker
            :actions="null"
            v-model:value="userInfoFormModel.birthday"
            type="date"
            clearable
          />
        </n-form-item>
        <n-form-item :label="$t('user.entity.occupation')">
          <n-input clearable v-model:value="userInfoFormModel.occupation" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.introduction')">
          <n-input clearable v-model:value="userInfoFormModel.introduction" type="textarea" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.whatsapp')">
          <n-input clearable v-model:value="userInfoFormModel.whatsapp" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.facebook')">
          <n-input clearable v-model:value="userInfoFormModel.facebook" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.linkedin')">
          <n-input clearable v-model:value="userInfoFormModel.linkedin" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.youtube')">
          <n-input clearable v-model:value="userInfoFormModel.youtube" />
        </n-form-item>
        <n-form-item :label="$t('user.entity.instagram')">
          <n-input clearable v-model:value="userInfoFormModel.instagram" />
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="updateUserInfo">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, h, toRefs } from 'vue'
import { NButton } from "naive-ui"
import UploadImage from "@/components/UploadImage/index.vue"
import { netUserInfoList, netUserInfoUpdate } from "@/api/userInfo"
import { netMemberShipList } from "@/api/memberShip"
import { netGradeList } from "@/api/grade"
import { netGroupList } from '@/api/group'
import { netUserEnable } from '@/api/user'
import { IMemberShip } from '@/types/memberShip'
import { netCountries, netStates } from '@/api/address'
import type { IGroup } from '@/types/group'
import type { ICountry, IAddressState } from '@/types/address'
import { EUserInfoMember } from "@/types/userInfo"
import type { IGrade } from "@/types/grade"
import type { IUserInfo, IUserInfoSearch, IUserInfoUpdate } from "@/types/userInfo"
import { useI18n } from 'vue-i18n'
import { PersonCircleSharp } from "@vicons/ionicons5"
interface IState {
  tableData: IUserInfo[],
  searchFormModel: IUserInfoSearch,
  gradeList: IGrade[],
  memberShipList: IGrade[],
  groupList: IGroup[],
  editModelVisible: boolean,
  userInfoFormModel: IUserInfoUpdate,
  memberOptions: { label: string, value: EUserInfoMember }[]
  countryOptions: { label: ICountry['name'], value: ICountry['id'], code: ICountry['iso2'] }[]
  stateOptions: { label: IAddressState['name'], value: IAddressState['id'] }[]
}
interface ICreateColumns {
  onSwitch(row: IUserInfo): void
  onEdit(row: IUserInfo): void
  t(s: string): void
}
const memberOptions = Object.keys(EUserInfoMember).map(k => {
  return {
    label: k,
    value: EUserInfoMember[k]
  }
})
const createColumns = ({ t, onSwitch, onEdit }: ICreateColumns) => {
  return [
    {
      title: t('user.entity.name'),
      key: 'name',
      width: 100,
      align: 'center',
      render(row: IUserInfo) {
        return h(
          'span',
          {
            style: { cursor: 'pointer' },
            onClick: () => onEdit(row)
          },
          { default: () => row.name }
        )
      }
    },
    {
      title: t('user.entity.gradeId'),
      key: 'gradeName',
      align: 'center',
      width: 120
    },
    {
      title: t('user.entity.groupId'),
      key: 'groupName',
      align: 'center',
      width: 100
    },
    {
      title: t('user.entity.positionId'),
      key: 'positionName',
      align: 'center',
      width: 120
    },
    {
      title: t('user.entity.member'),
      key: 'member',
      align: 'center',
      width: 160
    },
    {
      title: t('user.entity.concatNumber'),
      key: 'concatNumber',
      align: 'center',
      width: 140
    },
    {
      title: t('user.entity.companyVos'),
      key: 'companyVos',
      align: 'center',
      width: 130,
      render(row: IUserInfo) {
        return row.companyVos.map(v => v.companyName).map(cn => {
          return h(
            'div',
            {},
            { default: () => cn }
          )
        })
      }
    },
    {
      title: t('user.entity.industry'),
      key: 'industry',
      width: 120,
      align: 'center'
    },
    {
      title: t('user.entity.country'),
      key: 'countryName',
      width: 120,
      align: 'center'
    },
    {
      title: t('user.entity.state'),
      key: 'stateName',
      width: 120,
      align: 'center'
    },
    {
      title: t('user.entity.attendance'),
      key: 'attendance',
      width: 120,
      align: 'center'
    },
    {
      title: t('user.entity.referralSend'),
      key: 'referralSend',
      width: 130,
      align: 'center'
    },
    {
      title: t('user.entity.referralReceived'),
      key: 'referralReceived',
      width: 130,
      align: 'center'
    },
    {
      title: t('user.entity.thankYouNote'),
      key: 'thankYouNote',
      width: 140,
      align: 'center',
      render(row: IUserInfo) {
        return h(
          'span',
          {},
          { default: () => `${row.thankYouNote} | ${row.thankYouNoteSum}` }
        )
      }
    },
    {
      title: t('column.operate'),
      key: 'thankYouNote',
      align: 'center',
      width: 200,
      render(row: IUserInfo) {
        return h(
          "div",
          {},
          [
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                onClick: () => onSwitch(row)
              },
              {
                default: () => {
                  if (row.enable) {
                    return t('user.button.disable')
                  }
                  return t('user.button.enable')
                }
              }
            ),
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                onClick: () => onEdit(row)
              },
              { default: () => t('button.edit') }
            )
          ]
        )
      }
    }
  ]
}

export default defineComponent({
  components: { UploadImage, PersonCircleSharp },
  setup() {
    const { t } = useI18n()
    const state = reactive<IState>({
      tableData: [],
      searchFormModel: {},
      gradeList: [],
      groupList: [],
      editModelVisible: false,
      userInfoFormModel: {},
      memberShipList: [],
      memberOptions,
      countryOptions: [],
      stateOptions: []
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
    const handleSearchParams = (): IUserInfoSearch => {
      const params: IUserInfoSearch = {}
      Object.keys(state.searchFormModel).forEach(k => {
        if (state.searchFormModel[k]) {
          params[k] = state.searchFormModel[k]
        }
      })
      params.page = paginationConfig.page
      params.size = paginationConfig.pageSize
      return params
    }
    const getTableData = () => {
      netUserInfoList(handleSearchParams())
        .then(res => {
          const { list, total } = res.data
          console.log(res)
          state.tableData = list
          paginationConfig.itemCount = total
        })
    }
    getTableData()
    const getGradeData = () => {
      netGradeList()
        .then(res => {
          state.gradeList = res.data.map((v: IGrade) => {
            return {
              label: v.positionName,
              value: v.positionId
            }
          })
        })
    }
    getGradeData()
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
    const getCountryData = () => {
      netCountries()
        .then(res => {
          state.countryOptions = res.data.map((v: ICountry) => {
            return {
              label: v.name,
              value: v.id,
              code: v.iso2
            }
          })
        })
    }
    getCountryData()
    const getStateData = (init = false) => {
      if (!init) {
        state.userInfoFormModel.state = null
      }
      // const selectCountry = state.countryOptions.find(v => v.value === state.userInfoFormModel.country)
      netStates()
        .then(res => {
          state.stateOptions = res.data.map((v: IAddressState) => {
            return {
              label: v.name,
              value: v.id
            }
          })
        })
    }
    return {
      baseUrl: import.meta.env.VITE_BASE_API,
      ...toRefs(state),
      columns: createColumns({
        t,
        onSwitch(row) {
          console.log(row)
          const { userId, enable } = row
          netUserEnable({ id: userId, enable: !enable })
            .then(() => {
              getTableData()
              window.$message.success('操作成功')
            })
        },
        onEdit(row) {
          console.log(row)

          state.userInfoFormModel = JSON.parse(JSON.stringify(row))
          getStateData(true)
          state.editModelVisible = true
        }
      }),
      paginationConfig,
      onSearch() {
        getTableData()
      },
      updateUserInfo() {
        netUserInfoUpdate(state.userInfoFormModel)
          .then(() => {
            getTableData()
            state.editModelVisible = false
            window.$message.success('操作成功')
          })
      },
      getStateData
    }
  }
})
</script>