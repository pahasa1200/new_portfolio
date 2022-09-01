<template>
  <div class="home">
    <MainSection />
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
    <div class="sections-menu">
      <span
        class="menu-point"
        v-bind:class="{ active: activeSection === Number(index) }"
        v-on:click="scrollToSection(Number(index))"
        v-for="(offset, index) in offsets"
        v-bind:key="index">
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onUnmounted, reactive, ref,
} from 'vue';
import MainSection from '@/components/Sections/MainSetion.vue';

export default defineComponent({

  components: { MainSection },

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
  background-color: #000;
  color: white;
}

section.black {
  background: #edf2f8;
}

.blue {
  background-color: #000;
  color: white;
}

.green {
  background: #edf2f8;;
}

h1.black {
  color: #FFFFFF;
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

@-webkit-keyframes orbit {
  from { -webkit-transform:rotate(0deg) }
  to { -webkit-transform:rotate(360deg) }
}
@-moz-keyframes orbit {
  from { -moz-transform:rotate(0deg) }
  to { -moz-transform:rotate(360deg) }
}

</style>
