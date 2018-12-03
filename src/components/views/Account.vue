<template>
  <div class="row d-flex justify-content-around accountPage">
    <PageContenHeader pageTitle="Account Page"/>
    <div class="col col-sm-12 m-2">
      <div class="row">
        <div class="col col-sm-12">
          <div class="alert alert-secondary">
            <h5 class="text-center">Profile</h5>
            <p>
              <strong>Email Address:</strong>
              {{ authUser.email}}
              <span
                class="badge badge-info"
                v-show="!!authRole"
              >[{{authRole}}]</span>
            </p>
          </div>
        </div>
        <div class="col col-sm-12">
          <PasswordUpdateForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PasswordUpdateForm from "@/components/forms/PasswordUpdate";
import PageContenHeader from "@/components/PageContentHeader";

export default {
  name: "Account",
  computed: mapGetters(["authUser", "authRole"]),
  components: {
    PasswordUpdateForm,
    PageContenHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accountPage {
  max-width: 30rem;
  margin: auto;
}
</style>
