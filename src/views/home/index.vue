<template>
  <div>
    首页,会需要一个统计表,
    等我思考下
    {{ JSON.stringify(selectValue) }}
  </div>
  <TheSelect 
    :options="[{name: '选项1', code: 1}, { name: '选项2', code: 2 }]" 
    value-key="code"
    label-key="name"
    v-model="selectValue"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TheSelect from "@/components/TheSelect/index.vue"


export default defineComponent({
  components: { TheSelect },
  setup() {

    return {
      selectValue: ref([])
    }
  }
})
</script>

<style scoped>
</style>