<template>
  <div class="chat-conversation">
    <div
      class="chat-conversation__message"
      :class="{ 'rightSide' : userObject.name === message.user.name }"
      v-for="message in messages"
      :message="message"
      v-bind:key="message.id">
      <strong>
        {{ userObject.name !== message.user.name ? message.user.name : t('chat.you') }}:
      </strong>
      {{ message.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted, reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { Socket } from 'socket.io-client';

interface ClientToServerEvents {
  message: (data: never) => void;
}

interface InterServerEvents {
  disconnect: () => void;
}

interface Props {
  socket: Socket<ClientToServerEvents, InterServerEvents>;
  userObject: Record<any, string>;
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>();

let messages = reactive([]);
const { t } = useI18n();

onMounted(() => {
  props.socket.on('message', (data) => {
    messages.push(data);
  });
  props.socket.on('disconnect', () => {
    messages = [];
  });
});

</script>

<style lang="scss">
.chat-conversation {
  padding: 10px 0;

  &__message {
    padding: 0 10px;
    text-align: left;
  }

  &__message.rightSide {
    text-align: right;
  }
}
</style>
