<template>
  <div class="button__container">
    <el-button
      class="chat__button"
      @click="onClickCallback"
      :type="buttonType"
    >
      {{ t(`${ buttonText }`) }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    onClickCallback: {
      type: Object,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
  },

  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style lang="scss" scoped>
</style>
