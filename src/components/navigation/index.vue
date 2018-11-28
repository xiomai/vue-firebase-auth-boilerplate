<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">{{ appShortName }}</a>
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
          <a class="nav-link">Home</a>
        </router-link>
        <router-link tag="li" :to="{name: 'manage.books'}">
          <a class="nav-link">Students</a>
        </router-link>
        <router-link tag="li" :to="{name: 'manage.students'}">
          <a class="nav-link">Books</a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click.prevent="logout">Logout</button>
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
    logout() {
      firebase.auth.signOut();
    }
  }
};
</script>

