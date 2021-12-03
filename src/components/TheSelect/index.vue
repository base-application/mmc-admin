<template>
  <div class="flex">
    <n-select
      clearable
      multiple
      :options="optionsComputed"
      :value="value"
      @update:value="updateValue"
    />
    <n-checkbox class="ml-2" @update:checked="updateAllValue">全选</n-checkbox>
  </div>
  
</template>
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { IObject } from "@/types/common"
export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    },
    options: {
      type: Array as PropType<Array<IObject>>,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const { modelValue } = toRefs(props)
    return {
      value: modelValue,
      optionsComputed: computed(() => {
        return props.options.map(v => {
          return {
            ...v,
            label: v[props.labelKey],
            value: v[props.valueKey]
          }
        })
      }),
      updateValue(value: Array<number>) {
        context.emit("update:modelValue", value)
      },
      updateAllValue(value: boolean) {
        if (value) {
          const allValue = props.options.map(v => v[props.valueKey])
          context.emit("update:modelValue", allValue)
        } else {
          context.emit("update:modelValue", [])
        }
      }
    }
  }
})
</script>