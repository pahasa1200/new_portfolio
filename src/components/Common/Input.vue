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

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  inputPlaceholder: string,
  modelValue: string,
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>();
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue', 'inputKeyUp']);

const moduleVal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

</script>

<style lang="scss" scoped>
</style>
