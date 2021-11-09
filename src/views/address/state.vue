<template>
  <n-data-table
    remote
    size="small"
    :single-line="false"
    :columns="columns"
    :data="tableData"
    max-height="calc(100vh - 150px)"
    :pagination="paginationConfig"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { netStates } from '@/api/address'
import { PaginationInfo } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const createColumns = ({ t }) => {
  return [
    {
      title: t('address.state.entity.name'),
      key: 'name',
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
      itemCount: 0,
      pageSize: 0,
      prefix: ({ itemCount }: PaginationInfo) => {

        return t('page.total',{ total:itemCount })
      }
    })
    const getTableData = () => {
      netStates()
        .then(res => {
          state.tableData = res.data
          paginationConfig.itemCount = res.data.length
          paginationConfig.pageSize = res.data.length
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