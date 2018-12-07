<template>
  <div class="row">
    <PageContenHeader pageTitle="Home Page"/>
    <div class="row d-flex justify-content-around col-sm-12">
      <div class="col col-md-6 col-sm-12 mt-2">
        <RecentAddedBooks :recentBooks="recentBooks"/>
      </div>
      <div class="col col-md-6 col-sm-12 mt-2">
        <RecentBorrowedBooks :recentBorrowedBooks="recentBorrowedBooks"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { books, borrowedBooks } from "@/config/firebase";
import RecentAddedBooks from "@/components/views/templates/books/RecentAddedBooks";
import RecentBorrowedBooks from "@/components/views/templates/books/RecentBorrowedBooks";
import PageContenHeader from "@/components/PageContentHeader";

export default {
  name: "HomePage",
  components: {
    PageContenHeader,
    RecentAddedBooks,
    RecentBorrowedBooks
  },
  computed: {
    ...mapGetters(["recentBooks", "recentBorrowedBooks"])
  },
  created() {
    books.DBReference.on("value", snapshot => {
      this.$store.dispatch("setBooks", snapshot.val());
    });
    borrowedBooks.DBReference.on("value", snapshot => {
      this.$store.dispatch("setBorrowedBooks", snapshot.val());
    });
  },
  beforeDestroy() {
    books.DBReference.off();
    borrowedBooks.DBReference.off();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-main-logo {
  max-width: 100px;
}
</style>
