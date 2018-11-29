<template>
  <form class="text-center" @submit.prevent="validateBeforeSubmit()">
    <fieldset>
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
          placeholder="Password"
          v-model="password_confirm"
          v-validate="'required|min:6|confirmed:password'"
        >
      </div>
      <div class="alert alert-danger error mb-3" v-show="errors.any()">
        <div v-if="errors.has('password')">{{ errors.first('password') }}</div>
        <div v-if="errors.has('password_confirm')">{{ errors.first('password_confirm') }}</div>
        <div v-if="errors.has('relogin')">{{ errors.first('relogin') }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Update Password</button>
    </fieldset>
  </form>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { auth } from "../../config/firebase";

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "PasswordUpdateForm",
  data: function() {
    return {
      password: "",
      password_confirm: ""
    };
  },
  methods: {
    clearPasswords() {
      this.password = "";
      this.password_confirm = "";
    },
    async updatePassword() {
      try {
        await auth.doPasswordUpdate(this.password);
        this.clearPasswords();
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          this.$validator.errors.add({
            field: "relogin",
            msg:
              "Sorry, you are logged in too long. You must re-login to be able to update password."
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
          // then do update password
          this.updatePassword();
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
