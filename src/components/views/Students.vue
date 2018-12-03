<template>
  <div class="row">
    <PageContenHeader pageTitle="Students Page"/>
  </div>
</template>

<script>
import PageContenHeader from "@/components/PageContentHeader";

export default {
  name: "Students",
  components: {
    PageContenHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
