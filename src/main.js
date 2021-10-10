import Vue from 'vue'
import App from './App.vue'

//we are running the init file
import './init'
import "normalize.css";

// @ -> src/
// if we import a folder ( as in /router ) the index.js export will be imported
import router from '@/router';
import store from '@/stores';

Vue.config.productionTip = false


//First component to be shown
new Vue({
  router,
  store,
  render (renderer) {
    return renderer( App );
  },
  //render: renderer => renderer(App),
}).$mount('#app')
