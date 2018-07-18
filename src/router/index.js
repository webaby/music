import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index/Index.vue';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer.vue';

Vue.use(Router); //注册路由功能

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/song',
      name: 'song',
      component: MusicPlayer
    }
  ]
});
