<template>
  <div class="button__container">
    <el-button
      class="chat__button"
      @click="emit('onClickCallback')"
      :type="buttonType"
    >
      {{ t(buttonText) }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

interface Props {
  buttonText: string,
  buttonType: string | 'primary',
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>();
// eslint-disable-next-line no-undef
const emit = defineEmits(['onClickCallback']);

const { t } = useI18n();
</script>

<style lang="scss" scoped>
</style>
