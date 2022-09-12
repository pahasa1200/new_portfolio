<template>
  <div class="chat">
    <div class="chat__wrapper" v-if="userObject.name">
      <chat-conversation class="chat_conversation__box" :socket="socket" :user-object="userObject"/>
      <div class="chat__controls">
        <Input
          class="chat__input"
          :input-place-holder="t('chat.input')"
          :model-value="message"
          @update:modelValue="newValue => message = newValue"
          @input-key-up="onKeyUp"
        />
        <Button
          class="chat__button"
          button-type='primary'
          button-text="chat.send"
          @on-cick-callback="sendMessage"
        />
      </div>
      <div class="chat__participants">
        <chat-user-list :socket="socket"/>
      </div>
    </div>
    <div class="chat__error" v-else>
      {{ t('chat.error') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onBeforeMount, onBeforeUnmount, reactive, Ref, ref,
} from 'vue';
import io from 'socket.io-client';
import { useI18n } from 'vue-i18n';
import ChatUserList from '../components/Chat/ChatUserList.vue';
import ChatConversation from '../components/Chat/ChatConversation.vue';
import Button from '../components/Common/Button.vue';
import Input from '../components/Common/Input.vue';

type UserObject = {
  name: string | null,
}

const { t } = useI18n();
const message: Ref<string> = ref('');
const socket: Ref = ref(null);
const userObject: UserObject = reactive({ name: null });
const socketTimer: Ref = ref('');

function connect() {
  socket.value.emit('connected', userObject);
}

function sendMessage() {
  socket.value.emit('message', {
    user: userObject,
    message: message.value,
  });
  message.value = '';
}

function isConnected() {
  if (!socket.value.connected) {
    socket.value = io('http://localhost:8081');
    socket.value.on('connect', () => {
      connect();
    });
  }
  socketTimer.value = setTimeout(isConnected, 5000);
}

function onKeyUp(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

onBeforeMount(() => {
  userObject.name = prompt('Please enter your username:', '');
  if (userObject.name) {
    socket.value = io('http://localhost:8081');
    socket.value.on('connect', () => {
      connect();
    });
    isConnected();
  }
});

onBeforeUnmount(() => {
  if (socket.value) {
    socket.value.emit('disconnected', {
      user: userObject,
    });
  }
  clearTimeout(socketTimer.value);
});
</script>

<style lang="scss" scoped>
.chat__button {
  margin-left: 5px;
}

.chat__input {
  display: flex;
  width: 100%;
}

.chat__controls {
  display: flex;
  grid-area: f;
  max-height: 32px;
}

.chat_conversation__box {
  grid-area: m;
}

.chat__participants {
  grid-area: h;
  background: black;
  color: white;
  padding-left: 0.5em;
}

.chat__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(5px, auto);
  grid-template:
      "h m m" minmax(92vh, auto)
      "h m m"
      "h f f";
}
</style>
