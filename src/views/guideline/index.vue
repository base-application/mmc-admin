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
    v-model:show="guidelineModelVisible"
    preset="card"
    :title="$t('model.add')"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form label-placement="left" :label-width="200" :model="guidelineFormModel" size="small">
        <n-form-item :label="$t('guideline.entity.guideLineTitle')">
          <n-input v-model:value="guidelineFormModel.guideLineTitle" />
        </n-form-item>
        <n-form-item :label="$t('guideline.entity.guideLineImage')">
          <UploadImage @on-finish="uploadImageFinish" :show-add="!guidelineFormModelPoster">
            <img width="100" v-show="guidelineFormModelPoster" :src="guidelineFormModelPoster" />
          </UploadImage>
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, h, toRefs, computed } from 'vue'
import { NButton, NImage, useDialog } from "naive-ui"
import UploadImage from '@/components/UploadImage/index.vue'
import { dialogDelete, ImageAddBaseUrl } from '@/utils/common'
import { IInfo } from '@/types/common'
import { IGuideLine } from '@/types/guideline'
import { netGuideLineAdd, netGuideLineDelete, netGuideLineList } from '@/api/guideline'
import { useI18n } from 'vue-i18n'
interface IState {
  tableData: IGuideLine[]
  guidelineModelVisible: boolean
  guidelineFormModel: IInfo<IGuideLine>
}
interface ICreateColumns {
  onDelete(row: IGuideLine): void
  t(s: string): void
}
const createColumns = ({ onDelete, t }: ICreateColumns) => {
  return [
    {
      title: t('guideline.entity.guideLineTitle'),
      key: "guideLineTitle",
      align: "center"
    },
    {
      title: t('guideline.entity.guideLineImage'),
      key: "guideLineImage",
      align: "center",
      render(row: IGuideLine) {
        return h(
          NImage,
          {
            width: '100',
            src: ImageAddBaseUrl(row.guideLineImage)
          }
        )
      }
    },
    {
      title: t('column.operate'),
      key: 'operate',
      align: 'center',
      width: 200,
      render(row: IGuideLine) {
        return h(
          "div",
          {},
          [
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
      guidelineModelVisible: false,
      guidelineFormModel: {}
    })
    const paginationConfig = reactive({
      page: 1,
      itemCount: 0,
      pageCount: 1,
      prefix: ({ itemCount }) => {
        return t('page.total',{ total:itemCount })
      }
    })
    const getTableData = () => {
      netGuideLineList()
        .then(res => {
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
        })
    }
    getTableData()
    return {
      paginationConfig,
      ...toRefs(state),
      columns: createColumns({
        t,
        onDelete(row) {
          dialogDelete(dialog, () => {
            netGuideLineDelete({ guideLineId: row.guideLineId })
              .then(() => {
                getTableData()
                window.$message.success(t("message.success"))
              })
          })
        }
      }),
      onSubmit() {
        netGuideLineAdd(state.guidelineFormModel)
          .then(() => {
            window.$message.success(t("message.success"))
            getTableData()
            state.guidelineModelVisible = false
          })
      },
      onAdd() {
        state.guidelineFormModel = {}
        state.guidelineModelVisible = true
      },
      uploadImageFinish(url: string) {
        state.guidelineFormModel.guideLineImage = url
      },
      guidelineFormModelPoster: computed(() => {
        if (state.guidelineFormModel.guideLineImage) {
          return ImageAddBaseUrl(state.guidelineFormModel.guideLineImage)
        }
        return ''
      })
    }
  }
})
</script>