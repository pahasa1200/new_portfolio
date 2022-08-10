<template>
  <div class="navbar">
    <div class="navbar__logo">
      <a><p><strong>Pavel</strong> Zharski</p></a>
    </div>
    <div class="navbar__links">
      <router-link to="">{{ t('common.about') }}</router-link>
      <router-link to="">{{ t('common.projects') }}</router-link>
      <router-link to="">{{ t('common.chat') }}</router-link>
    </div>
    <div class="navbar__contact">
      <router-link to="">{{ t('navbar.contactWithMe') }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #edf2f8;
  }
  .navbar__contact {
    a {
      text-decoration: 0;
      color: black;
    }
  }
  .navbar__links {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      margin-right: 10px;
      text-decoration: 0;
      color: black;
      font-weight: 700;
    }
  }
</style>
