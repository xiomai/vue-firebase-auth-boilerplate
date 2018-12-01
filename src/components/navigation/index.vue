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
      @click="toggleCollapse"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse" :class="{collapse: collapsed}" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <router-link tag="li" :to="{name: 'home'}">
          <a class="nav-link">
            <i class="fas fa-home"></i>
          </a>
        </router-link>
        <router-link tag="li" :to="{name: 'manage.books'}">
          <a class="nav-link">Books</a>
        </router-link>
        <router-link tag="li" :to="{name: 'manage.students'}">
          <a class="nav-link">Students</a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link v-if="isSuperadmin" :to="{ name: 'manage.users' }">
          <button class="btn btn-secondary my-2 my-sm-0">
            <i class="fas fa-users"></i>
          </button>
        </router-link>
        <router-link :to="{ name: 'manage.account' }">
          <button class="btn btn-secondary my-2 my-sm-0 ml-3">
            <i class="fas fa-user"></i>
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
import { mapGetters } from "vuex";
import { firebase } from "../../config/firebase";

export default {
  name: "NavBar",
  data: function() {
    return {
      collapsed: true
    };
  },
  computed: {
    ...mapGetters({
      isSuperadmin: "authIsSuperAdmin"
    }),
    appShortName: function() {
      return process.env.VUE_APP_SHORT_NAME;
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
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

