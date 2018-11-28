<template>
  <div>Logged out</div>
</template>
<script>
import { firebase } from "../../config/firebase";
export default {
  async mounted() {
    await firebase.auth.signOut();
  }
};
</script>
