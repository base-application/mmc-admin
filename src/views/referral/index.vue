<template>
  <n-tabs v-model:value="tabName" type="card" tab-style="min-width: 200px;">
    <n-tab-pane :tab="$t('referral.referral.tab')" name="Referral">
      <ReferralTable />
    </n-tab-pane>
    <n-tab-pane :tab="$t('referral.thank.tab')" name="Thank">
      <ThankTable />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ReferralTable from './ReferralTable.vue'
import ThankTable from './ThankTable.vue'
export default defineComponent({
  components: { ReferralTable, ThankTable },
  setup() {
    return {
      tabName: ref('Referral')
    }
  }
})
</script>