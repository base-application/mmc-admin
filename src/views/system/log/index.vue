<template>
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
import { defineComponent, reactive, toRefs } from 'vue'
import { netLogList } from "@/api/log"
import { useI18n } from 'vue-i18n'
import { PaginationInfo } from 'naive-ui'

const createColumns = ({ t }) => {
  return [
    {
      title: t('system.log.entity.logId'),
      key: 'logId',
      align: 'center'
    },
    {
      title: t('system.log.entity.loginName'),
      key: 'loginName',
      align: 'center'
    },
    {
      title: t('system.log.entity.requestIp'),
      key: 'requestIp',
      align: 'center'
    },
    {
      title: t('system.log.entity.requestPath'),
      key: 'requestPath',
      align: 'center'
    },
    {
      title: t('system.log.entity.requestMethod'),
      key: 'requestMethod',
      align: 'center'
    },
    {
      title: t('system.log.entity.modular'),
      key: 'modular',
      align: 'center'
    }
  ]
}
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const state = reactive({
      tableData: []
    })
    const paginationConfig = reactive({
      page: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      showSizePicker: true,
      itemCount: 100,
      prefix({ itemCount }: PaginationInfo) {
        return t('page.total', { total: itemCount })
      },
      onChange: (page) => {
        paginationConfig.page = page
        getTableData()
      },
      onPageSizeChange: (pageSize) => {
        paginationConfig.pageSize = pageSize
        paginationConfig.page = 1
        getTableData()
      }
    })
    const getTableData = () => {
      const pageParams = {
        page: paginationConfig.page,
        size: paginationConfig.pageSize
      }
      netLogList(pageParams)
        .then(res => {
          const { list, total } = res.data
          state.tableData = list
          paginationConfig.itemCount = total
        })
    }
    const columns = createColumns({ t })
    getTableData()
    return {
      ...toRefs(state),
      columns,
      paginationConfig,
      getTableData
    }
  }
})
</script>