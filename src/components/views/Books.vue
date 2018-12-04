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
        <div class="card border-secondary">
          <div class="card-header">Recently Added Books</div>
          <div class="card-body p-0">
            <ul class="list-group">
              <li
                :key="book.key"
                v-for="book in recentBooks"
                class="list-group-item d-flex justify-content-between align-items-center mx-0"
              >
                {{book.title}}
                <span class="badge badge-primary badge-pill">ISBN: {{book.key}}</span>
              </li>
              <li
                v-if="!recentBooks.length"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <span class="badge badge-warning badge-pill">No Books added yet.</span>
              </li>
            </ul>
          </div>
        </div>
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
import EventBus from "@/config/EventBus";

export default {
  name: "Books",
  components: {
    PageContenHeader,
    AddBookForm,
    BooksTable
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
