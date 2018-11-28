<template>
  <div class="hello">
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from "../forms/login";
export default {
  name: "LoginPage",
  components: {
    LoginForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
