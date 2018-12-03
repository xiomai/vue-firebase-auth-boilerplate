<template>
  <form class="text-center" @submit.prevent="validateBeforeSubmit">
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
            :readonly="confirmDelete"
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
            :readonly="confirmDelete"
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
            :readonly="confirmDelete"
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
        <p>Administrator successfully {{!editUserId ? 'added' : 'updated'}}.</p>
      </div>
      <button type="submit" class="btn btn-primary" v-if="!editUserId">Assign Administrator</button>
      <button
        type="submit"
        class="btn btn-primary ml-2"
        v-if="!!editUserId"
        @click.prevent="assignUidAsAdmin"
      >Update</button>
      <button
        type="button"
        class="btn btn-danger ml-2"
        v-if="!!editUserId"
        :disabled="confirmDelete"
        @click="confirmDeleteButtons"
      >
        <i class="fas fa-trash"></i> Delete
      </button>
      <button
        type="button"
        class="btn btn-seondary ml-2"
        v-if="!!editUserId"
        @click="cancelEditMode"
      >
        <i class="fas fa-times-circle"></i> Cancel
      </button>
      <div class="alert alert-danger mt-2" v-if="confirmDelete">
        <button type="button" class="btn btn-danger ml-2" @click="deleteUser">
          <i class="fas fa-trash"></i> Confirm
        </button>
        <button type="button" class="btn btn-seondary ml-2" @click="cancelDeleteButtons">
          <i class="fas fa-times-circle"></i> Cancel
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import VeeValidate from "vee-validate";
import { users } from "@/config/firebase";
import EventBus from "@/config/EventBus";

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
      success: false,
      confirmDelete: false
    };
  },
  props: {
    editUserId: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["users"]),
    emailDomain: function() {
      return process.env.VUE_APP_EMAIL_DOMAIN;
    }
  },
  methods: {
    clear() {
      this.uid = "";
      this.fullname = "";
      this.email = "";
      this.confirmDelete = false;
      this.$validator.reset();
    },
    setFormEditData(user_id) {
      const user = this.users[user_id];
      this.uid = user_id;
      this.fullname = user.name;
      this.email = user.email;
    },
    confirmDeleteButtons() {
      this.confirmDelete = true;
    },
    cancelDeleteButtons() {
      this.confirmDelete = false;
    },
    cancelEditMode() {
      this.clear();
      EventBus.$emit("cancel-edit-mode");
    },
    async assignUidAsAdmin() {
      try {
        const email = !process.env.VUE_APP_EMAIL_DOMAIN
          ? this.email
          : this.email + process.env.VUE_APP_EMAIL_DOMAIN;

        await users.addUserThenAssignAsAdmin(this.uid, this.fullname, email);
        this.success = true;
        EventBus.$emit("cancel-edit-mode");
        this.clear();

        const snapshot = await users.onceGetUsers();

        this.$store.dispatch("setUsers", snapshot.val());
        setTimeout(() => (this.success = false), 2000);
      } catch (error) {
        if (error) {
          this.$validator.errors.add({
            field: "custom_errors",
            msg: error.message
          });
        }

        /* eslint-disable-next-line*/
        console.log(error.code, error.message);
      }
    },
    async deleteUser() {
      try {
        await users.deleteUserAndRole(this.uid);
        EventBus.$emit("cancel-edit-mode");
        this.success = true;
        this.clear();

        const snapshot = await users.onceGetUsers();

        this.$store.dispatch("setUsers", snapshot.val());
        setTimeout(() => (this.success = false), 2000);
      } catch (error) {
        if (error) {
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
  },
  mounted() {
    EventBus.$on("edit-mode-enabled", user_id => {
      this.clear();
      this.setFormEditData(user_id);
    });
  }
};
</script>

<style scoped>
.error {
  max-width: 30rem;
  margin: auto;
}
</style>
