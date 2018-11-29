<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <router-link tag="li" :to="{name: 'home'}">
      <a class="navbar-brand" href="#">{{ appShortName }}</a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor01"
      aria-controls="navbarColor01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <router-link tag="li" :to="{name: 'home'}">
          <a class="nav-link">
            <i class="fas fa-home"></i>
          </a>
        </router-link>
        <router-link tag="li" :to="{name: 'manage.students'}">
          <a class="nav-link">Books</a>
        </router-link>
        <router-link tag="li" :to="{name: 'manage.books'}">
          <a class="nav-link">Students</a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link :to="{ name: 'manage.account' }">
          <button class="btn btn-secondary my-2 my-sm-0">
            <i class="fas fa-user"></i> Account
          </button>
        </router-link>
        <button class="btn btn-secondary my-2 my-sm-0 ml-3" type="submit" @click.prevent="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { firebase } from "../../config/firebase";

export default {
  name: "NavBar",
  computed: {
    appShortName: function() {
      return process.env.VUE_APP_SHORT_NAME;
    }
  },
  methods: {
    async logout() {
      try {
        await firebase.auth.signOut();
        this.$store.dispatch("logout");
        this.$router.replace("/login");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

