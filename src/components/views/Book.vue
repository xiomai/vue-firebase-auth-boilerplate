<template>
  <div class="row">
    <PageContenHeader pageTitle="Book Page"/>
    <div class="col-sm-12">
      <router-link :to="{ name: 'manage.books'}">
        <button type="button" class="btn btn-seondary ml-2">
          <i class="fas fa-chevron-left"></i>
        </button>
      </router-link>
    </div>
    <div v-if="isBookLoaded" class="d-flex justify-content-around col-sm-12">
      <div class="col col-md-6 col-sm-12 alert alert-primary m-2">
        <h4 class="text-center">Information</h4>
        <p>
          <strong>ISBN:</strong>
          {{routeISBN}}
        </p>
        <p>
          <strong>Title:</strong>
          {{book.title}}
        </p>
        <p>
          <strong>Author:</strong>
          {{book.author}}
        </p>
        <p>
          <strong>Publisher:</strong>
          {{book.publisher}}
        </p>
      </div>
      <div class="col col-md-6 col-sm-12 alert alert-secondary m-2">
        <h4 class="text-center">Status</h4>
      </div>
    </div>
    <div v-else class="col col-sm-12 p-4">
      <div class="alert alert-warning text-center">
        <h4 class="alert-heading mt-2">Book does not exist.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import { books } from "@/config/firebase";
import PageContenHeader from "@/components/PageContentHeader";

export default {
  name: "Book",
  data() {
    return {
      book: null
    };
  },
  components: {
    PageContenHeader
  },
  computed: {
    routeISBN() {
      return this.$route.params.isbn;
    },
    isBookLoaded() {
      return !isEmpty(this.book);
    }
  },
  async created() {
    try {
      const book = await books.onceGetBook(this.routeISBN);
      this.book = book.val();
    } catch (error) {
      /* eslint-disable-next-line*/
      console.log(error.code, error.message);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
