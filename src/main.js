import Vue from 'vue'
import App from './App.vue'
import { firebase } from "./config/firebase";

Vue.config.productionTip = false
let app;

/* eslint-disable-next-line */
firebase.auth.onAuthStateChanged(function(authUser) {
  if (!app) {
    app = new Vue({
      render: h => h(App),
    }).$mount('#app')
  }
});
