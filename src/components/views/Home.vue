<template>
  <div class="row">
    <PageContenHeader pageTitle="Home Page"/>
  </div>
</template>

<script>
import PageContenHeader from "../PageContentHeader";

export default {
  name: "HomePage",
  components: {
    PageContenHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-main-logo {
  max-width: 100px;
}
</style>
