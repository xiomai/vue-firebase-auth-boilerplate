<template>
  <div>Logged out</div>
</template>
<script>
import { auth } from "@/config/firebase";

export default {
  async mounted() {
    try {
      await auth.doSignOut();
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    } catch (error) {
      /* eslint-disable-next-line*/
      console.log("Error", error.code, error.message);
    }
  }
};
</script>
