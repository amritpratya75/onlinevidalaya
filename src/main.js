import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from './firebase'

import '@/assets/main.css'


Vue.config.productionTip = false


let app = '';
fb.auth.onAuthStateChanged(user => {
  store.dispatch('fetchUserProfile',user)
  store.dispatch('downloadProfileImage')
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});




