<template>
  <div class="chat-conversation">
    <div
      class="chat-conversation__message"
      :class="{ 'rightSide' : userObject.name === message.user.name }"
      v-for="message in messages"
      :message="message"
      v-bind:key="message.id">
      <strong>
        {{ userObject.name !== message.user.name  ? message.user.name : $t('chat.you') }}:
      </strong>
      {{ message.message }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    socket: {
      type: Object,
      required: true,
    },
    userObject: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    let messages = reactive([]);
    const { t } = useI18n();

    onMounted(() => {
      props.socket.on('message', (data: never) => {
        messages.push(data);
      });
      props.socket.on('disconnect', () => {
        messages = [];
      });
    });

    return { messages, t };
  },
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
