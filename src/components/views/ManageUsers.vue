<template>
  <div class="row">
    <PageContenHeader pageTitle="Manage Users"/>
    <div class="row d-flex justify-content-around col-sm-12 mb-4">
      <div class="col col-md-6 col-sm-12 mt-2 list-group border-success">
        <a href="#" class="list-group-item list-group-item-action active">System Administrators</a>
        <a
          href="#"
          class="list-group-item list-group-item-action"
          v-for="(value, key) in users"
          :key="key"
          @click.prevent="enableEditMode(key)"
        >
          {{value.name}}
          <span class="badge badge-success badge-pill">{{value.email}}</span>
        </a>
        <a
          href="#"
          v-show="!users"
          class="list-group-item list-group-item-action disabled"
        >No Site Administrators created yet.</a>
      </div>
      <div class="col col-md-6 col-sm-12 mt-2">
        <div class="card border-secondary">
          <div class="card-body">
            <div class="alert alert-secondary">
              <a :href="firebaseConsoleAuthUrl" class="alert-link">
                <img src="../../assets/firebase_28dp.png" class="firebase_logo"> Go to Firebase Console
              </a> and create a user.
              <br>Get the
              <strong>`User UID`</strong> and enter below.
              <br>
              <a href="../../assets/firebase_create_then_uid.png" class="alert-link">
                <img src="../../assets/firebase_create_then_uid.png" class="img-fluid">
              </a>
            </div>
            <AssignAdminRoleForm :editUserId="editUserId" @cancel-edit-mode="disableEditMode"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isEmpty } from "lodash";
import AssignAdminRoleForm from "@/components/forms/AssignAdminRoleForm";
import PageContenHeader from "@/components/PageContentHeader";
import { users } from "@/config/firebase";
import EventBus from "@/config/EventBus";

export default {
  name: "ManageUsers",
  data() {
    return {
      editUserId: ""
    };
  },
  components: {
    PageContenHeader,
    AssignAdminRoleForm
  },
  computed: {
    ...mapGetters({ users: "users" }),
    firebaseConsoleAuthUrl: function() {
      const firebaseappURL =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_PROJECT_ID
          : process.env.VUE_APP_PROJECT_ID_DEV;
      const url = `https://console.firebase.google.com/project/${firebaseappURL}/authentication/users`;

      return url;
    }
  },
  methods: {
    enableEditMode(user_id) {
      this.editUserId = user_id;
      EventBus.$emit("edit-mode-enabled", user_id);
    },
    disableEditMode() {
      this.editUserId = "";
    },
    async fetchUsers() {
      try {
        const snapshot = await users.onceGetUsers();
        const usersPayload = isEmpty(snapshot.val()) ? null : snapshot.val();

        this.$store.dispatch("setUsers", usersPayload);
      } catch (error) {
        /* eslint-disable-next-line*/
        console.log(error.code, error.message);
      }
    }
  },
  created() {
    this.fetchUsers();
  },
  beforeDestroy() {
    this.$store.commit("clearUsers");
  },
  mounted() {
    EventBus.$on("cancel-edit-mode", () => {
      this.disableEditMode();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.firebase_logo {
  max-width: 2rem;
}
</style>
