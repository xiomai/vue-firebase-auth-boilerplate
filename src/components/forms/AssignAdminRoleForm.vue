<template>
  <form class="text-center" @submit.prevent="validateBeforeSubmit()">
    <fieldset>
      <div class="form-group">
        <label for="email">Firebase User UID</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="uid"
            name="uid"
            placeholder="Firebase User UID"
            v-model="uid"
            v-validate="'required'"
            @keyup.enter="validateBeforeSubmit"
          >
        </div>
      </div>
      <div class="form-group">
        <label for="email">Fullname</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="fullname"
            name="fullname"
            placeholder="Fullname"
            v-model="fullname"
            v-validate="'required|alpha_spaces'"
            @keyup.enter="validateBeforeSubmit"
          >
        </div>
      </div>
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
      <div class="alert alert-danger error mb-3" v-show="errors.any()">
        <div v-if="errors.has('uid')">{{ errors.first('uid') }}</div>
        <div v-if="errors.has('fullname')">{{ errors.first('fullname') }}</div>
        <div v-if="errors.has('email')">{{ errors.first('email') }}</div>
        <div v-if="errors.has('custom_errors')">{{ errors.first('custom_errors') }}</div>
      </div>
      <div class="alert alert-success mb-3" v-show="success">
        <p>Administrator successfully added.</p>
      </div>
      <button type="submit" class="btn btn-primary">Assign Administrator</button>
    </fieldset>
  </form>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { users } from "../../config/firebase";

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "AssignAdminRoleForm",
  data: function() {
    return {
      uid: "",
      fullname: "",
      email: "",
      success: false
    };
  },
  computed: {
    emailDomain: function() {
      return process.env.VUE_APP_EMAIL_DOMAIN;
    }
  },
  methods: {
    clear() {
      this.uid = "";
      this.fullname = "";
      this.email = "";
      this.success = false;
    },
    async assignUidAsAdmin() {
      try {
        this.success = true;
        const email = !process.env.VUE_APP_EMAIL_DOMAIN
          ? this.email
          : this.email + process.env.VUE_APP_EMAIL_DOMAIN;

        await users.addUserThenAssignAsAdmin(this.uid, this.fullname, email);
        const snapshot = await users.onceGetUsers();

        this.$store.dispatch("setUsers", snapshot.val());
        setTimeout(() => this.clear(), 2000);
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
          this.assignUidAsAdmin();
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
