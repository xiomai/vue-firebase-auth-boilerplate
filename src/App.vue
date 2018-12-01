<template>
  <div id="app">
    <nav-bar v-if="authenticated"></nav-bar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { firebase } from "./config/firebase";
import router from "./config/router";
import store from "./containers/store";
import NavBar from "./components/navigation";
import "./assets/bootstrap.min.css";

export default {
  store,
  router,
  name: "app",
  computed: mapGetters(["authenticated"]),
  components: {
    NavBar
  },
  created: function() {
    firebase.auth.onAuthStateChanged(function(authUser) {
      store.dispatch("login", { user: authUser });
      if (authUser && authUser.uid) {
        store.dispatch("fetchRole", authUser.uid);
        router.replace({ name: "home" });
      }
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-main-logo {
  max-width: 200px;
}
</style>
