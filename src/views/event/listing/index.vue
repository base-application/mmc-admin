<template>
  <n-tabs v-model:value="tabName" type="card" tab-style="min-width: 200px;">
    <n-tab-pane :tab="$t('event.list.attendance')" name="Attendance">
      <AttendanceTable />
    </n-tab-pane>
    <n-tab-pane :tab="$t('event.list.facebook')" name="Comment">
      <CommentTable />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AttendanceTable from './AttendanceTable.vue'
import CommentTable from './CommentTable.vue'
export default defineComponent({
  components: { AttendanceTable, CommentTable },
  setup() {
    return {
      tabName: ref('Attendance')
    }
  }
})
</script>