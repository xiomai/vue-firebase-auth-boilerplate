<template>
  <div id="app">
    <nav-bar v-if="authUser"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { firebase } from "./config/firebase";
import router from "./config/router";
import store from "./containers/store";
import NavBar from "./components/navigation";
import "./assets/bootstrap.min.css";

export default {
  store,
  router,
  name: "app",
  computed: mapState(["authUser"]),
  components: {
    NavBar
  },
  created: function() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        store.dispatch("logout");
        router.replace({ name: "login" });
        return;
      }

      store.dispatch("login", { user: authUser });
      router.replace({ name: "home" });
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-main-logo {
  max-width: 200px;
}
</style>
