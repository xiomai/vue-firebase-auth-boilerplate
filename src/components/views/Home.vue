<template>
  <div class="row">
    <PageContenHeader pageTitle="Home Page"/>
    <div class="row d-flex justify-content-around col-sm-12">
      <div class="col col-md-6 col-sm-12 mt-2">
        <div class="card border-success">
          <div class="card-header">Recently Added Books</div>
          <div class="card-body">
            <h4 class="card-title">Primary card title</h4>
            <p
              class="card-text"
            >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
      <div class="col col-md-6 col-sm-12 mt-2">
        <div class="card border-secondary">
          <div class="card-header">Recenly Borrowed Books</div>
          <div class="card-body">
            <h4 class="card-title">Primary card title</h4>
            <p
              class="card-text"
            >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    </div>
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
