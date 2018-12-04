<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        skipDiacritics: true,
        placeholder: 'Search Books',
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 20,
        position: 'top',
        dropdownAllowAll: false,
        rowsPerPageLabel: 'Rows per page',
      }"
    >
      <div slot="table-actions">
        <button
          v-show="!viewForm"
          @click="showAddForm"
          type="button"
          class="btn btn-primary m-2"
        >Add Books Form</button>
      </div>
      <div slot="emptystate">There are no Books record.</div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'after'">
          <button type="button" class="btn btn-seondary ml-2">
            <i class="fas fa-book-open"></i>
            Show Info
          </button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueGoodTable } from "vue-good-table";
import { map } from "lodash";
import EventBus from "@/config/EventBus";
import "vue-good-table/dist/vue-good-table.css";

export default {
  name: "BooksTable",
  props: {
    viewForm: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: "ISBN",
          field: "isbn",
          type: "number",
          sortable: false,
          width: "10rem"
        },
        {
          label: "Title",
          field: "title",
          sortable: false
        },
        {
          label: "Publisher",
          field: "publisher",
          sortable: false
        },
        {
          label: "Author",
          field: "author",
          sortable: false
        },
        {
          label: "Actions",
          field: "after"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["books"]),
    rows() {
      const { books } = this;
      const mappedBooksIntoRowsDataset = map(books, (book, key) => ({
        isbn: key,
        title: book.title,
        publisher: book.publisher,
        author: book.author
      }));

      return mappedBooksIntoRowsDataset;
    }
  },
  methods: {
    showAddForm() {
      EventBus.$emit("show-add-book-form");
    }
  }
};
</script>
