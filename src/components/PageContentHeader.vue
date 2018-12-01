<template>
  <div class="m-auto text-center">
    <img alt="Vue logo" class="app-main-logo" src="../assets/logo.png">
    <h1>{{pageTitle}}</h1>
  </div>
</template>

<script>
export default {
  // name: "page-content-header",
  props: ["pageTitle"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-main-logo {
  max-width: 100px;
}
</style>
