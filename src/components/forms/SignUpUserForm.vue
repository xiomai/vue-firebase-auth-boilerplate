<template>
  <form class="text-center" @submit.prevent="validateBeforeSubmit()">
    <fieldset>
      <div class="form-group">
        <label for="email">Email address</label>
        <div class="input-group mb-3">
          <input
            :type="emailDomain ? 'text' : 'email'"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
            v-validate="{required: true, alpha_dash: !!emailDomain, email: !emailDomain}"
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
          name="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
          v-validate="'required|min:6'"
          ref="password"
        >
      </div>
      <div class="form-group">
        <label for="password_confirm">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          name="password_confirm"
          id="password_confirm"
          placeholder="Confirm Password"
          v-model="password_confirm"
          v-validate="'required|min:6|confirmed:password'"
        >
      </div>
      <div class="alert alert-danger error mb-3" v-show="errors.any()">
        <div v-if="errors.has('email')">{{ errors.first('email') }}</div>
        <div v-if="errors.has('password')">{{ errors.first('password') }}</div>
        <div v-if="errors.has('password_confirm')">{{ errors.first('password_confirm') }}</div>
        <div v-if="errors.has('custom_errors')">{{ errors.first('custom_errors') }}</div>
      </div>
      <div class="alert alert-success mb-3" v-show="success">
        <p>Administrator successfully added.</p>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up Administrator</button>
    </fieldset>
  </form>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { auth, roles } from "../../config/firebase";

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "SignUpUserForm",
  data: function() {
    return {
      email: "",
      password: "",
      password_confirm: "",
      success: false
    };
  },
  computed: {
    emailDomain: function() {
      return process.env.VUE_APP_EMAIL_DOMAIN;
    }
  },
  methods: {
    clearPasswords() {
      this.email = "";
      this.password = "";
      this.password_confirm = "";
      this.success = false;
    },
    async signupUser() {
      try {
        const userCred = await auth.doCreateUserWithEmailAndPassword(
          this.email,
          this.password
        );
        /* eslint-disable-next-line*/
        console.log(userCred.user.uid);
        await roles.addUserAsAdminRole(userCred.user.uid);

        setTimeout(this.clearPasswords(), 2000);
      } catch (error) {
        if (error.code) {
          this.$validator.errors.add({
            field: "custom_errors",
            msg: error.message
          });
        }
        /* eslint-disable-next-line*/
        console.log(error.code, error.message);
      }
    },
    async validateBeforeSubmit() {
      try {
        const response = await this.$validator.validateAll();
        if (response) {
          this.signupUser();
        }
      } catch (error) {
        /* eslint-disable-next-line*/
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.error {
  max-width: 30rem;
  margin: auto;
}
</style>
