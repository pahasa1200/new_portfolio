<template>
  <section class="presentation container">
    <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
      <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style="stroke: none; fill:#c54375"/>
    </svg>
    <Navbar class="presentation__nav"/>
    <div class="presentation__main">
      <div>
        <h3 class="welcomeText">{{ t('main.hello') }}</h3>
        <h2 class="title">
          {{ t('common.frontEndDeveloper').toUpperCase() }}
        </h2>
      </div>
      <div class="images">
        <img src="@/assets/js.png" alt="JavaScript"/>
        <div class="orbitContainer">
          <img class="dot dot-1" src="@/assets/react.png" alt="React"/>
          <img class="dot dot-2" src="@/assets/vue.png" alt="Vue"/>
          <img class="dot dot-3" src="@/assets/html.png" alt="HTML"/>
          <img class="dot dot-4" src="@/assets/css.png" alt="CSS"/>
        </div>
      </div>
    </div>
    <div class="presentation__footer">
      <img class="image"
           src="@/assets/linkedin.png"
           alt="Linkedin"/>
      <img
        class="image instagram"
        src="@/assets/instagram.png"
        alt="Instagram"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({

  components: { Navbar },

  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  opacity: 5%;
  top: 0;
  left: 0;
  z-index: 2;
}

.presentation {
  height: 100vh;
  background: #edf2f8;

  &__footer {
    display: flex;
    margin-top: -60px;
    align-items: center;

    @include for-size(phone-only) {
      margin-top: -100px;
    }

    img {
      z-index: 99;
    }

    .image {
      width: 40px;
      margin: 5px;

      &:hover {
        cursor: pointer;
        transform: scale(1.5);
        transition: all ease 0.3s;
      }
    }

    .image.instagram {
      width: 35px;
      height: 35px;
    }
  }

  &__main {
    height: 100%;
    margin-top: -73px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;

    @include for-size(phone-only) {
      flex-direction: column;
      justify-content: space-evenly;
    }

    .welcomeText {
      color: #4b4cdb;
      text-align: center;

      @include for-size(tablet-landscape-up) {
        text-align: initial;
      }
    }

    .title {
      font-size: 3rem;
      margin-top: 10px;
      text-align: center;

      @include for-size(phone-only) {
        margin-bottom: 0;
      }
    }

    img {
      max-height: 200px;
      position: relative;
    }

    .images {
      position: relative;
      .orbitContainer {
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        -webkit-animation-name: orbit-fae5bece;
        -webkit-animation-duration: 5s;
        -moz-animation-iteration-count: infinite;
        -moz-animation-timing-function: linear;
        -moz-animation-name: orbit-fae5bece;
        -moz-animation-duration: 5s;
        top: 0;
        right: 0;
        display: none;

        @include for-size(tablet-landscape-up) {
          display: block;
        }

        .dot {
          width: 40px;
        }

        .dot-1 {
          position: absolute;
          top: 0;
          bottom: 200px;
          left: 0;
          right: -100px;
          margin-left: 100px;
        }

        .dot-2 {
          position: absolute;
          top: 100px;
          bottom: 0;
          right: 0;
          left: -100px;
          margin-left: 100px;
        }

        .dot-3 {
          position: absolute;
          top: 100px;
          left: 0;
          bottom: 200px;
          right: 100px;
          margin-left: 210px;
        }

        .dot-4 {
          position: absolute;
          bottom: 0;
          top: 200px;
          right: 0;
          left: 0;
          margin-left: 100px;
        }
      }
    }
  }
}
</style>
