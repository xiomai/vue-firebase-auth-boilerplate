<template>
  <div class="row">
    <PageContenHeader pageTitle="Books Page"/>
    <div class="row d-flex justify-content-around col-sm-12">
      <div v-show="viewForm" class="col col-md-4 col-sm-12 mb-2">
        <div class="card border-success">
          <div class="card-body">
            <AddBookForm/>
          </div>
        </div>
      </div>
      <div v-show="viewForm" class="col col-md-4 col-sm-12 mt-2">
        <RecentAddedBooks :recentBooks="recentBooks"/>
      </div>
    </div>
    <div class="col-sm-12 my-5">
      <BooksTable :viewForm="viewForm"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { books } from "@/config/firebase";
import PageContenHeader from "@/components/PageContentHeader";
import AddBookForm from "@/components/forms/books/AddBookForm";
import BooksTable from "@/components/table/BooksTable";
import RecentAddedBooks from "@/components/views/templates/books/RecentAddedBooks";
import EventBus from "@/config/EventBus";

export default {
  name: "Books",
  components: {
    PageContenHeader,
    AddBookForm,
    BooksTable,
    RecentAddedBooks
  },
  data() {
    return {
      viewForm: false
    };
  },
  computed: {
    ...mapGetters(["recentBooks"])
  },
  methods: {
    enableForm() {
      this.viewForm = true;
    },
    disableForm() {
      this.viewForm = false;
    }
  },
  created() {
    books.DBReference.on("value", snapshot => {
      this.$store.dispatch("setBooks", snapshot.val());
    });
  },
  beforeDestroy() {
    books.DBReference.off();
    EventBus.$off(["show-add-book-form", "hide-add-book-form"]);
  },
  mounted() {
    EventBus.$on("show-add-book-form", () => {
      this.enableForm();
    });
    EventBus.$on("hide-add-book-form", () => {
      this.disableForm();
    });
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
