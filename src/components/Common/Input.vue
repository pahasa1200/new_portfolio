<template>
 <div>
   <el-input
     class="chat__input"
     @keyup="$emit('inputKeyUp', $event)"
     v-model="moduleVal"
     :placeholder="inputPlaceholder"
   />
 </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    inputPlaceholder: {
      type: String,
    },
    modelValue: {
      type: String,
    },
  },

  emits: ['update:modelValue', 'inputKeyUp'],

  setup(props, { emit }) {
    const moduleVal = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return { moduleVal };
  },
});
</script>

<style lang="scss" scoped>
</style>
