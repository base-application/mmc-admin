<template>
  <n-button
    type="primary"
    size="small"
    @click="onAdd"
    style="margin-bottom:10px;"
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
    v-model:show="advertisementModelVisible"
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
        :model="advertisementFormModel"
        size="small"
      >
        <n-form-item :label="$t('advertisement.entity.advertisementLink')">
          <n-input clearable v-model:value="advertisementFormModel.advertisementLink" />
        </n-form-item>
        <n-form-item :label="$t('advertisement.entity.advertisementPoster')">
          <UploadImage @on-finish="uploadImageFinish" :show-add="!advertisementFormModelPoster">
            <img
              width="100"
              v-show="advertisementFormModelPoster"
              :src="advertisementFormModelPoster"
            />
          </UploadImage>
        </n-form-item>
        <n-form-item :label="$t('advertisement.entity.advertisementType')">
          <n-select
            v-model:value="advertisementFormModel.advertisementType"
            :options="typeOptions"
          />
        </n-form-item>
        <n-form-item :label="$t('advertisement.entity.status')">
          <n-checkbox v-model:checked="advertisementFormModel.status" />
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
import { NButton, NImage, useDialog } from "naive-ui"
import UploadImage from '@/components/UploadImage/index.vue'
import { dialogDelete, ImageAddBaseUrl } from '@/utils/common'
import { IAdvertisement, EAdvertisementType } from '@/types/advertisement'
import { netAdvertisementAdd, netAdvertisementDelate, netAdvertisementList } from '@/api/advertisement'
import { IInfo } from '@/types/common'
import { useI18n } from 'vue-i18n'
enum EModelType {
  add = "add",
  edit = "edit"
}
const typeOptions = [
  { value: EAdvertisementType.click, label: '点击' },
  { value: EAdvertisementType.slider, label: '滑动' }
]
interface IState {
  tableData: IAdvertisement[],
  advertisementModelVisible: boolean,
  advertisementFormModel: IInfo<IAdvertisement>,
  modelType: EModelType
}
interface ICreateColumns {
  onEdit(row: IAdvertisement): void
  onDelete(row: IAdvertisement): void
  t(s: string): void
}
const createColumns = ({ onEdit, onDelete, t }: ICreateColumns) => {
  return [
    {
      title: t('advertisement.entity.advertisementLink'),
      key: "advertisementLink",
      align: "center"
    },
    {
      title: t('advertisement.entity.advertisementPoster'),
      key: "advertisementPoster",
      align: "center",
      render(row: IAdvertisement) {
        return h(
          NImage,
          {
            width: '100',
            src: ImageAddBaseUrl(row.advertisementPoster)
          }
        )
      }
    },
    {
      title: t('advertisement.entity.advertisementType'),
      key: "advertisementType",
      align: "center",
      render(row: IAdvertisement) {
        return typeOptions.find(v=>v.value === row.advertisementType)?.label
      }
    },
    {
      title: t('advertisement.entity.status'),
      key: "status",
      align: "center",
      render(row: IAdvertisement) {
        return `${row.status}`
      }
    },
    {
      title: t('column.operate'),
      align: 'center',
      width: 200,
      render(row: IAdvertisement) {
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
      advertisementModelVisible: false,
      advertisementFormModel: {},
      modelType: EModelType.add
    })
    const paginationConfig = reactive({
      page: 1,
      pageSize: 10,
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
    const getTableData = () => {
      netAdvertisementList()
        .then(res => {
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
          paginationConfig.pageSize = res.data.length
        })
    }
    getTableData()

    return {
      modelTitle: computed(() => {
        return {
          [EModelType.add]: t('model.add'),
          [EModelType.edit]: t('model.edit')
        }[state.modelType]
      }),
      typeOptions,
      paginationConfig,
      ...toRefs(state),
      columns: createColumns({
        t,
        onEdit(row) {
          state.modelType = EModelType.edit
          state.advertisementFormModel = JSON.parse(JSON.stringify(row))
          state.advertisementModelVisible = true
        },
        onDelete(row) {
          console.log(row)
          dialogDelete(dialog, () => {
            netAdvertisementDelate({ id: row.advertisementId })
              .then(() => {
                getTableData()
                window.$message.success(t("message.success"))
              })
          })
        }
      }),
      onSubmit() {
        netAdvertisementAdd(state.advertisementFormModel)
          .then(() => {
            window.$message.success(t("message.success"))
            getTableData()
            state.advertisementModelVisible = false
          })
      },
      onAdd() {
        state.modelType = EModelType.add
        state.advertisementModelVisible = true
      },
      uploadImageFinish(url: string) {
        state.advertisementFormModel.advertisementPoster = url
      },
      advertisementFormModelPoster: computed(() => {
        if (state.advertisementFormModel.advertisementPoster) {
          return ImageAddBaseUrl(state.advertisementFormModel.advertisementPoster)
        }
        return ''
      })
    }
  }
})
</script>