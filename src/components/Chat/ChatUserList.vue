<template>
  <div class="chat-user-list">
    <h3>{{ t('chat.usersOnline') }}: {{ Object.keys(users).length }} </h3>
    <div class="chat-user-list__user" v-for="user in users" v-bind:key="user.name">
      {{ user.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Socket } from 'socket.io-client';

interface ClientToServerEvents {
  users: (users: Record<any, string>) => void;
}

interface InterServerEvents {
  disconnect: () => void;
}

interface Props {
  socket: Socket<ClientToServerEvents, InterServerEvents>;
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>();

const users = ref({});
const { t } = useI18n();

onMounted(() => {
  props.socket.on('users', (costumers) => {
    users.value = costumers;
  });
  props.socket.on('disconnect', () => {
    users.value = {};
  });
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
