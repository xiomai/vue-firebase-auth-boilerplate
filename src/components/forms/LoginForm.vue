<template>
  <div class="container">
    <div class="row">
      <div class="col col-sm-12 text-center">
        <img alt="Vue logo" class="app-main-logo" src="../../assets/logo.png">
      </div>
      <div class="col col-sm-12">
        <div class="d-flex justify-content-center m-3">
          <div class="card border-primary mt-3" style="max-width: 40rem;">
            <div class="card-header">{{appName}}</div>
            <div class="card-body">
              <form class="text-center">
                <fieldset>
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <div class="input-group mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        v-model="email"
                        @keyup.enter="login"
                      >
                      <div class="input-group-append" v-if="emailDomain">
                        <span class="input-group-text">{{ emailDomain }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      v-model="password"
                      @keyup.enter="login"
                    >
                  </div>
                  <div class="alert alert-danger" v-if="loginError">{{loginError}}</div>
                  <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/config/firebase";

export default {
  name: "LoginForm",
  data: function() {
    return {
      email: "",
      password: "",
      loginError: ""
    };
  },
  computed: {
    emailDomain: function() {
      return process.env.VUE_APP_EMAIL_DOMAIN;
    },
    appName: function() {
      return process.env.VUE_APP_NAME;
    }
  },
  methods: {
    async login() {
      this.loginError = "";
      const email = !process.env.VUE_APP_EMAIL_DOMAIN
        ? this.email
        : this.email + process.env.VUE_APP_EMAIL_DOMAIN;

      try {
        await auth.doSignInWithEmailAndPassword(email, this.password);
        this.$router.replace("/");
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.message);
        this.loginError = `!Login Error! ${error.code}`;
        setTimeout(() => {
          this.loginError = "";
        }, 2000);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 50%;
}
</style>
