<template>
  <div class="navbar">
    <div class="navbar__logo">
      <a><p><strong>Pavel</strong> Zharski</p></a>
    </div>
    <div class="navbar__links">
      <router-link class="navbar__link" to="">{{ t('common.about').toUpperCase() }}</router-link>
      <router-link class="navbar__link" to="">{{ t('common.projects').toUpperCase() }}</router-link>
      <router-link class="navbar__link" to="">{{ t('common.chat').toUpperCase() }}</router-link>
    </div>
    <div class="navbar__contact">
      <router-link to=""><i class="el-icon-message"></i></router-link>
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
  .navbar__link:hover {
    color: #4b4cdb;
  }

  .el-icon-message {
    margin-left: 100px;
    font-size: 1.5rem;
  }

  .el-icon-message:hover {
    color: #4b4cdb;
    transform: scale(1.5);
    transition: all ease 0.3s;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #edf2f8;
  }

  .navbar__logo {
    font-size: 1.4rem;
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
