<template>
  <div class="home">
    <section class="navSection container">
      <Navbar class="navSection__nav" />
      <div class="navSection__mainBlock">
        <div class="navSection__mainBlock__container">
          <h3 class="navSection__mainBlock__welcomeText">-Hello! I am Pavel.</h3>
          <h2 class="navSection__mainBlock__title" style="text-align: center">
            FRONT END DEVELOPER
          </h2>
        </div>
        <div class="navSection__mainBlock__images">
          <img src="../assets/js.png" alt="JavaScript"/>
          <div class="sun">
            <img class="dot-1" style="width: 40px" src="../assets/react.png" alt="React"/>
            <img class="dot-2" style="width: 40px" src="../assets/vue.png" alt="Vue"/>
            <img class="dot-3" style="width: 40px" src="../assets/html.png" alt="HTML"/>
            <img class="dot-4" style="width: 40px" src="../assets/css.png" alt="CSS"/>
          </div>
        </div>
      </div>
      <div class="navSection__footer">
        <img class="navSection__footer__image"
             src="../assets/linkedin.png"
             alt="JavaScript"/>
        <img
          class="navSection__footer__image instagram"
          src="../assets/instagram.png"
          alt="JavaScript"
        />
      </div>
    </section>
    <div class="sections-menu">
      <span
        class="menu-point"
        v-bind:class="{ active: activeSection === Number(index) }"
        v-on:click="scrollToSection(Number(index))"
        v-for="(offset, index) in offsets"
        v-bind:key="index">
      </span>
    </div>
    <section class="fullpage blue">
      <h1>Vue.js Fullpage Scroll</h1>
      <p>by <a href="https://webdeasy.de/?referer=cp-NVOEBL" target="_blank">WebDEasy</a></p>
    </section>
    <section class="fullpage black">
      <h1>Section 2</h1>
      <p>made with <a href="https://vuejs.org/" target="_blank">Vue.js</a></p>
    </section>
    <section class="fullpage red">
      <h1>Section 3</h1>
      <p>works on <b>desktop & mobile</b></p>
    </section>
    <section class="fullpage green">
      <h1>Section 4</h1>
      <p>Tutorial <a
        href="https://webdeasy.de/en/programming-vue-js-fullpage-scroll/?referer=cp-NVOEBL"
        target="_blank">here</a></p>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onUnmounted, reactive, ref,
} from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  components: { Navbar },

  setup() {
    const inMove = ref(false);
    const activeSection = ref(0);
    const offsets: any = reactive([]);
    const touchStartY = ref(0);

    const scrollToSection = (id: number, force = false) => {
      if (inMove.value && !force) return false;
      activeSection.value = id;
      inMove.value = true;
      document.getElementsByTagName('section')[id].scrollIntoView({
        behavior: 'smooth',
      });
      setTimeout(() => {
        inMove.value = false;
      }, 1000);
      return true;
    };

    const calculateSectionOffsets = () => {
      const sections = document.getElementsByTagName('section');
      const { length } = sections;
      for (let i = 0; i < length; i += 1) {
        const sectionOffset = sections[i].offsetTop;
        offsets.push(sectionOffset);
      }
    };

    const moveDown = () => {
      inMove.value = true;
      activeSection.value -= 1;
      if (activeSection.value < 0) activeSection.value = offsets.length - 1;
      scrollToSection(activeSection.value, true);
    };

    const moveUp = () => {
      inMove.value = true;
      activeSection.value += 1;
      if (activeSection.value > offsets.length - 1) activeSection.value = 0;
      scrollToSection(activeSection.value, true);
    };

    const handleMouseWheelDOM = (e: WheelEvent) => {
      if (e.deltaY > 0 && !inMove.value) {
        moveUp();
      } else if (e.deltaY < 0 && !inMove.value) {
        moveDown();
      }
      e.preventDefault();
      return false;
    };

    const touchStart = (e: TouchEvent) => {
      e.preventDefault();
      touchStartY.value = e.touches[0].clientY;
    };

    const touchMove = (e: TouchEvent) => {
      if (inMove.value) return false;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      if (touchStartY.value < currentY) {
        moveDown();
      } else {
        moveUp();
      }
      touchStartY.value = 0;
      return false;
    };

    onMounted(() => {
      window.addEventListener('wheel', handleMouseWheelDOM, {
        passive: false,
      }); // Mozilla Firefox
      window.addEventListener('touchstart', touchStart, {
        passive: false,
      }); // mobile devicesd
      window.addEventListener('touchmove', touchMove, {
        passive: false,
      }); // mobile device
      calculateSectionOffsets();
    });

    onUnmounted(() => {
      // window.removeEventListener('mousewheel', handleMouseWheel); // Other browsers
      window.removeEventListener('wheel', handleMouseWheelDOM); // Mozilla Firefox
      window.removeEventListener('touchstart', touchStart); // mobile devices
      window.removeEventListener('touchmove', touchMove); // mobile devices
    });

    return {
      activeSection,
      offsets,
      scrollToSection,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  background: #edf2f8;
}

.hFixed {
  position: fixed;
}

.fullpage {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.navSection {
  height: 100vh;
  background: #edf2f8;

  &__footer {
    display: flex;
    margin-top: -60px;
    align-items: center;

    &__image {
      width: 40px;
      margin: 5px;
    }

    &__image.instagram {
      width: 35px;
      height: 35px;
    }

  }

  &__mainBlock {
    height: 100%;
    margin-top: -73px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__welcomeText {
      color: #4b4cdb;
    }

    &__title {
      font-size: 3rem;
      margin-top: 10px;
    }

    img {
      max-height: 200px;
      position: relative;
    }
  }
}

h1 {
  font-size: 2.5em;
  margin: 0;
  text-align: center;
  padding: 0 1rem;

  @include for-size(desktop-up) {
    font-size: 6em;
  }
}

p {
  font-size: 1em;
}

.fullpage a {
  text-decoration: none;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  color: #FFF;
  margin-left: 5px;
}

.red {
  background-color: #ab4545;
}

section.black {
  background-color: #000;
}

.blue {
  background-color: #237ad4;
}

.green {
  background-color: #68c368;
}

h1.black {
  color: #000;
}

.sections-menu {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.sections-menu .menu-point {
  width: 10px;
  height: 10px;
  background-color: #c54375;
  display: block;
  margin: 1rem 0;
  opacity: .6;
  transition: .4s ease all;
  cursor: pointer;
  border-radius: 50%;
}

.sections-menu .menu-point.active {
  opacity: 1;
  transform: scale(1.5);
}

.dot-1 {
  position:absolute;
  top: 0;
  bottom: 200px;
  left: 0;
  right: -100px;
}

.dot-2 {
  position: absolute;
  top: 200px;
  bottom: 0;
  right: 0;
  left: -100px;
}

.dot-3 {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 200px;
  right: 100px;
  margin-left: 115px;
}

.dot-4 {
  position: absolute;
  bottom: 0;
  top: 200px;
  right: 0;
  left: 100px;
}

.sun {
  width: 250px;
  height: 300px;
  position: absolute;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -webkit-animation-name: orbit-fae5bece;
  -webkit-animation-duration: 5s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -moz-animation-name: orbit-fae5bece;
  -moz-animation-duration: 5s;
  top: 30%;
  right: 13%;

  @include for-size(phone-only) {
    display: none;
  }
}

@-webkit-keyframes orbit {
  from { -webkit-transform:rotate(0deg) }
  to { -webkit-transform:rotate(360deg) }
}
@-moz-keyframes orbit {
  from { -moz-transform:rotate(0deg) }
  to { -moz-transform:rotate(360deg) }
}

</style>
