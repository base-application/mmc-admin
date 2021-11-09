<template>
  <n-button
    type="primary"
    size="small"
    style="margin-bottom:10px;"
    @click="onAdd"
  >{{ $t('button.add') }}</n-button>
  <n-data-table
    remote
    size="small"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    :pagination="paginationConfig"
  />
  <n-modal
    v-model:show="sliderModelVisible"
    preset="card"
    :title="modelTitle"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form label-placement="left" :label-width="200" :model="sliderFormModel" size="small">
        <n-form-item :label="$t('slider.entity.sliderPoster')">
          <UploadImage
            @on-finish="uploadImageFinish"
            list-type="image"
            :showAdd="!sliderFormModelPoster"
          >
            <img width="100" v-show="sliderFormModelPoster" :src="sliderFormModelPoster" />
          </UploadImage>
        </n-form-item>
        <n-form-item :label="$t('slider.entity.gradeName')">
          <n-select
            clearable
            multiple
            :options="memberShipList"
            v-model:value="sliderFormModelMembership"
          />
        </n-form-item>
        <n-form-item :label="$t('slider.entity.group')">
          <n-select clearable multiple :options="groupList" v-model:value="sliderFormModelGroup" />
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
import { defineComponent, reactive, h, toRefs, computed } from 'vue'
import { NButton, NImage, NTime, useDialog } from "naive-ui"
import UploadImage from '@/components/UploadImage/index.vue'
import { dialogDelete, ImageAddBaseUrl } from '@/utils/common'
import { ISlider } from '@/types/slider'
import { IInfo, IPageParams } from '@/types/common'
import { netSliderAdd, netSliderDelete, netSliderList } from '@/api/slider'
import { IGroup, IGroupOption } from '@/types/group'
import { netGroupList } from '@/api/group'
import { netMemberShipList } from '@/api/memberShip'
import { IMemberShip, IMemberShipOption } from '@/types/memberShip'
import { useI18n } from 'vue-i18n'
enum EModelType {
  add = "add",
  edit = "edit"
}
interface IState {
  tableData: ISlider[]
  modelType: EModelType,
  sliderModelVisible: boolean
  sliderFormModel: IInfo<ISlider>
  memberShipList: IMemberShipOption[]
  groupList: IGroupOption[]
  sliderFormModelGroup: Array<IGroup['groupId']>
  sliderFormModelMembership: Array<IMemberShip['gradeId']>
}
interface ICreateColumns {
  onEdit(row: ISlider): void
  onDelete(row: ISlider): void
  t(s: string): void
}
const createColumns = ({ onEdit, onDelete, t }: ICreateColumns) => {
  return [
    {
      title: t('slider.entity.createTime'),
      key: "createTime",
      align: "center",
      render(row: ISlider) {
        return h(
          NTime,
          {
            time: row.createTime,
            format: "yyyy-MM-dd HH:mm:ss"
          }
        )
      }
    },
    {
      title: t('slider.entity.sliderPoster'),
      key: "sliderPoster",
      align: "center",
      render(row: ISlider) {
        return h(
          NImage,
          {
            width: '100',
            src: ImageAddBaseUrl(row.sliderPoster)
          }
        )
      }
    },
    {
      title: t('slider.entity.gradeName'),
      key: "gradeName",
      align: "center",
      render(row: ISlider) {
        return row.grades.map((v) => {
          return h(
            'div',
            {},
            { default: () => v.gradeName }
          )
        })
      }
    },
    {
      title: t('slider.entity.group'),
      key: "group",
      align: "center",
      render(row: ISlider) {
        return row.group.map((v) => {
          return h(
            'div',
            {},
            { default: () => v.groupName }
          )
        })
      }
    },
    {
      title: t('column.operate'),
      align: 'center',
      width: 200,
      render(row: ISlider) {
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
                default: () => t('button.edit')
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
                default: () => t('button.delete')
              }
            )
          ]
        )
      }
    }
  ]
}

export default defineComponent({
  components: { UploadImage },
  setup() {
    const { t } = useI18n()
    const dialog = useDialog()
    const state = reactive<IState>({
      tableData: [],
      sliderModelVisible: false,
      modelType: EModelType.add,
      sliderFormModel: {},
      memberShipList: [],
      groupList: [],
      sliderFormModelGroup: [],
      sliderFormModelMembership: []
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
    const handleSearchParams = (): IPageParams => {
      const params: IPageParams = {}
      params.page = paginationConfig.page
      params.size = paginationConfig.pageSize
      return params
    }
    const getTableData = () => {
      netSliderList(handleSearchParams())
        .then(res => {
          const { list, total } = res.data
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
    return {
      modelTitle: computed(() => {
        return {
          [EModelType.add]: t('model.add'),
          [EModelType.edit]: t('model.edit')
        }[state.modelType]
      }),
      paginationConfig,
      ...toRefs(state),
      columns: createColumns({
        t,
        onEdit(row) {
          state.sliderFormModelGroup = row.group.map(v => v.groupId)
          state.sliderFormModelMembership = row.grades.map(v => v.gradeId)
          state.sliderFormModel = JSON.parse(JSON.stringify(row))
          state.sliderModelVisible = true
        },
        onDelete(row) {
          console.log(row)
          dialogDelete(dialog, () => {
            netSliderDelete({ id: row.sliderId })
              .then(() => {
                getTableData()
                window.$message.success(t("message.success"))
              })
          })
        }
      }),
      onSubmit() {
        const grades = state.memberShipList.filter((v: IMemberShipOption) => state.sliderFormModelMembership.includes(v.value)).map((v: IMemberShipOption) => {
          return {
            gradeId: v.value,
            gradeName: v.label
          }
        })
        const groups = state.groupList.filter((v: IGroupOption) => state.sliderFormModelGroup.includes(v.value)).map((v: IGroupOption) => {
          return {
            groupId: v.value,
            groupName: v.label
          }
        })
        state.sliderFormModel.grades = grades
        state.sliderFormModel.group = groups
        netSliderAdd(state.sliderFormModel)
          .then(() => {
            window.$message.success(t("message.success"))
            getTableData()
            state.sliderModelVisible = false
          })
      },
      onAdd() {
        state.sliderFormModelMembership = []
        state.sliderFormModelGroup = []
        state.sliderFormModel = {}
        state.sliderModelVisible = true
      },
      uploadImageFinish(url: string) {
        state.sliderFormModel.sliderPoster = url
      },
      sliderFormModelPoster: computed(() => {
        if (state.sliderFormModel.sliderPoster) {
          return ImageAddBaseUrl(state.sliderFormModel.sliderPoster)
        }
        return ''
      })
    }
  }
})
</script>