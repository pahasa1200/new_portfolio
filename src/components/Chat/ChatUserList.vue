<template>
  <div class="chat-user-list">
    <h3>{{ t('chat.usersOnline') }}: {{ Object.keys(users).length }} </h3>
    <div class="chat-user-list__user" v-for="user in users" v-bind:key="user.name">
      {{ user.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    socket: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const users = ref({});
    const { t } = useI18n();

    onMounted(() => {
      props.socket.on('users', (costumers: any) => {
        users.value = costumers;
      });
      props.socket.on('disconnect', () => {
        users.value = {};
      });
    });

    return { users, t };
  },

});
</script>

<style lang="scss">
.chat-user-list {
  padding: 10px 0;

  &__user {
    padding: 0 10px;
    text-align: left;
  }
}
</style>
