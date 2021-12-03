<template>
<div v-html="htmlContent"></div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue"
export default defineComponent({
  props:{
    html:{
      type: String,
      default: ""
    }
  },
  setup(props) {
    return {
      htmlContent: computed(()=>{
        return props.html
      })
    }
  }
})
</script>
