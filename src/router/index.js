import Vue from 'vue'
import Router from 'vue-router'
import startscenecomponent from '@/components/startscenecomponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'startscenecomponent',
      component: startscenecomponent
    }
  ]
})
