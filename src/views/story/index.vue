<template>
  <n-form inline label-placement="left" :label-width="0" :model="searchFormModel" size="small">
    <n-form-item>
      <n-input
        clearable
        v-model:value="searchFormModel.title"
        :placeholder="$t('story.entity.title')"
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
    v-model:show="storyModelVisible"
    preset="card"
    :title="modelTitle"
    :bordered="false"
    closable
    class="large"
  >
    <div>
      <n-form label-placement="left" :label-width="200" :model="storyFormModel" size="small">
        <n-form-item :label="$t('story.entity.title')">
          <n-input clearable v-model:value="storyFormModel.title" />
        </n-form-item>
        <n-form-item :label="$t('story.entity.cover')">
          <UploadImage
            @on-finish="url => storyFormModel.cover = url"
            list-type="image"
            :showAdd="!storyFormModelCover"
          >
            <img width="100" v-show="storyFormModelCover" :src="storyFormModelCover" />
          </UploadImage>
        </n-form-item>
        <n-form-item :label="$t('story.entity.description')">
          <n-input type="textarea" clearable v-model:value="storyFormModel.description" />
        </n-form-item>
        <n-form-item label=" ">
          <n-radio-group v-model:value="storyType" name="radiogroup">
            <n-radio :value="EStoryType.image">
              {{ $t("story.imageType") }}
            </n-radio>
            <n-radio :value="EStoryType.video">
              {{ $t("story.videoType") }}
            </n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-show="storyType === EStoryType.video" :label="$t('story.entity.link')">
          <n-input clearable v-model:value="storyFormModel.link" />
        </n-form-item>
        <n-form-item v-show="storyType === EStoryType.image" :label="$t('story.entity.poster')">
          <UploadImageMultiple
            list-type="image-card"
            showFileList
            multiple
            :default-file-list="defaultImageList"
            @finish="uploadImageFinish"
            @remove="uploadImageRemove"
          >✛</UploadImageMultiple>
        </n-form-item>
        <n-form-item label=" ">
          <n-radio-group v-model:value="storyFormModelPushType" name="radiogroup">
            <n-radio :value="EStoryFormModelPushType.liji">{{ $t('story.publishNow') }}</n-radio>
            <n-radio :value="EStoryFormModelPushType.dingshi">{{ $t('story.timedRelease') }}</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item
          :label="$t('story.schedule')"
          v-show="storyFormModelPushType === EStoryFormModelPushType.dingshi"
        >
          <n-date-picker v-model:value="storyFormModel.pushTime" type="datetime" clearable />
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
import { NButton, NTime, useDialog } from "naive-ui"
import { netStoryAdd, netStoryDelete, netStoryList } from "@/api/story"
import UploadImageMultiple from '@/components/UploadImageMultiple/index.vue'
import UploadImage from '@/components/UploadImage/index.vue'
import { dialogDelete, ImageAddBaseUrl } from '@/utils/common'
import { IStory, IStoryInfo, IStorySearch } from '@/types/story'
import { useI18n } from 'vue-i18n'
enum EStoryFormModelPushType {
  liji = 1,
  dingshi
}
enum EModelType {
  add = "add",
  edit = "edit",
}
enum EStoryType {
  image = "image",
  video = "video"
}
interface IState {
  tableData: IStory[],
  searchFormModel: IStorySearch,
  searchDate: Nullable<number[]>
  storyModelVisible: boolean,
  storyFormModel: IStoryInfo,
  defaultImageList: { url: string }[]
  storyFormModelPushType: EStoryFormModelPushType,
  modelType: EModelType,
  storyType: EStoryType
}
interface ICreateColumns {
  onEdit(row: IStory): void
  onDelete(row: IStory): void
  t(s: string): void
}
const createColumns = ({ onEdit, onDelete, t }: ICreateColumns) => {
  return [
    {
      title: t('story.entity.pushTime'),
      key: "pushTime",
      align: "center",
      render(row: IStory) {
        return h(
          NTime,
          {
            time: row.pushTime,
            format: "yyyy-MM-dd HH:mm:ss"
          }
        )
      }
    },
    {
      title: t('story.entity.title'),
      key: "title",
      align: "center"
    },
    {
      title: t('story.entity.description'),
      key: "description",
      align: "center"
    },
    {
      title: t('story.entity.link'),
      key: "link",
      align: "center"
    },
    {
      title: t('column.operate'),
      align: 'center',
      width: 200,
      render(row: IStory) {
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
  components: { UploadImageMultiple, UploadImage },
  setup() {
    const { t } = useI18n()
    const dialog = useDialog()
    const state = reactive<IState>({
      tableData: [],
      searchFormModel: {},
      storyModelVisible: false,
      searchDate: null,
      storyFormModel: {},
      defaultImageList: [],
      storyFormModelPushType: EStoryFormModelPushType.liji,
      modelType: EModelType.add,
      storyType: EStoryType.image
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
    const handleSearchParams = (): IStorySearch => {
      const params: IStorySearch = {}
      Object.keys(state.searchFormModel).forEach(k => {
        if (state.searchFormModel[k]) {
          params[k] = state.searchFormModel[k]
        }
      })
      params.page = paginationConfig.page
      params.size = paginationConfig.pageSize
      if (state.searchDate && state.searchDate.length > 0) {
        params.startDate = state.searchDate[0]
        params.endDate = state.searchDate[1]
      }
      return params
    }
    const getTableData = () => {
      netStoryList(handleSearchParams())
        .then(res => {
          const { list, total } = res.data
          state.tableData = list
          paginationConfig.itemCount = total
        })
    }
    getTableData()
    return {
      EStoryType,
      storyFormModelCover: computed(() => {
        if (state.storyFormModel.cover) {
          return ImageAddBaseUrl(state.storyFormModel.cover)
        }
        return ''
      }),
      modelTitle: computed(() => {
        return {
          [EModelType.add]: t('model.add'),
          [EModelType.edit]: t('model.edit')
        }[state.modelType]
      }),
      EStoryFormModelPushType,
      paginationConfig,
      onSearch() {
        getTableData()
      },
      ...toRefs(state),
      columns: createColumns({
        t,
        onEdit(row) {
          console.log(row)
          state.defaultImageList = row.poster.map(v => {
            return {
              ...v,
              status: 'finished',
              name: v.url,
              url: ImageAddBaseUrl(v.url)
            }
          })
          state.storyType = row.link?EStoryType.video:EStoryType.image
          state.modelType = EModelType.edit
          state.storyFormModel = JSON.parse(JSON.stringify(row))
          state.storyModelVisible = true
        },
        onDelete(row) {
          console.log(row)
          dialogDelete(dialog, () => {
            netStoryDelete({ id: row.storyId })
              .then(() => {
                getTableData()
                window.$message.success(t("message.success"))
              })
          })
        }
      }),
      onSubmit() {
        if (state.storyFormModelPushType === EStoryFormModelPushType.liji) {
          state.storyFormModel.pushTime = Date.now()
        }
        if (state.storyType === EStoryType.image) {
          state.storyFormModel.link = undefined
        } else {
          state.storyFormModel.poster = undefined
        }
        netStoryAdd(state.storyFormModel)
          .then(() => {
            window.$message.success(t("message.success"))
            getTableData()
            state.storyModelVisible = false
          })
      },
      onAdd() {
        state.defaultImageList = []
        state.storyFormModel = {}
        state.modelType = EModelType.add
        state.storyType = EStoryType.video
        state.storyModelVisible = true
      },
      uploadImageFinish(url: string) {
        if (state.storyFormModel.poster && state.storyFormModel.poster.length > 0) {
          state.storyFormModel.poster.push({ url })
        } else {
          state.storyFormModel.poster = [{ url }]
        }
      },
      uploadImageRemove(file) {
        const { id, url } = file
        state.storyFormModel.poster = state.storyFormModel.poster?.filter(v => {
          return v.id !== id && v.url !== url
        })
      }
    }
  }
})
</script>