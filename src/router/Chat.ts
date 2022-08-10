import { RouteRecordRaw } from 'vue-router';

const ChatRoutes: Array<RouteRecordRaw> = [
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
  },
];

export default ChatRoutes;
