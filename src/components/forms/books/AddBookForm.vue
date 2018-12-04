<template>
  <form @submit.prevent="validateBeforeSubmit">
    <fieldset>
      <legend>Add Book Form</legend>
      <div class="form-group">
        <label for="exampleInputEmail1">ISBN</label>
        <input
          type="text"
          class="form-control"
          placeholder="ISBN"
          id="isbn"
          name="isbn"
          v-validate="'required|numeric|min:10|max:13'"
          v-model="isbn"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Book Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Book Title"
          id="bookTitle"
          name="bookTitle"
          v-validate="'required'"
          v-model="bookTitle"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Publisher</label>
        <input type="text" class="form-control" placeholder="Publisher" v-model="bookPublisher">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Author</label>
        <input type="text" class="form-control" placeholder="Author" v-model="bookAuthor">
      </div>
    </fieldset>
    <div class="alert alert-danger error mb-3" v-show="errors.any()">
      <div v-if="errors.has('isbn')">{{ errors.first('isbn') }}</div>
      <div v-if="errors.has('bookTitle')">{{ errors.first('bookTitle') }}</div>
      <div v-if="errors.has('custom_errors')">{{ errors.first('custom_errors') }}</div>
    </div>
    <div class="d-flex justify-content-between col-sm-12">
      <button type="submit" class="btn btn-primary">Save Book</button>
      <button @click="clear" type="button" class="btn btn-primary ml-2">Clear</button>
      <button type="button" class="btn btn-seondary ml-2" @click="hideForm">
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
  </form>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import spacetime from "spacetime";
import { books } from "@/config/firebase";
import EventBus from "@/config/EventBus";

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "AddBookForm",
  data() {
    return {
      isbn: "",
      bookTitle: "",
      bookPublisher: "",
      bookAuthor: ""
    };
  },
  methods: {
    clear() {
      this.isbn = "";
      this.bookTitle = "";
      this.bookPublisher = "";
      this.bookAuthor = "";
    },
    hideForm() {
      EventBus.$emit("hide-add-book-form");
    },
    async saveBook() {
      try {
        const params = {
          isbn: this.isbn,
          title: this.bookTitle,
          publisher: this.bookPublisher,
          author: this.bookAuthor,
          added_at: spacetime.now().epoch
        };

        await books.addBook(params);
        this.clear();
      } catch (error) {
        if (error) {
          this.$validator.errors.add({
            field: "custom_errors",
            msg: "Failed to add Book, ISBN may already exist."
          });
        }
        /* eslint-disable-next-line*/
        console.log(error.message);
      }
    },
    async validateBeforeSubmit() {
      try {
        const response = await this.$validator.validateAll();
        if (response) {
          this.saveBook();
        }
      } catch (error) {
        /* eslint-disable-next-line*/
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>
