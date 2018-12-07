<template>
  <form>
    <fieldset>
      <div class="form-group">
        <label for="icno">Borrower's IC No.</label>
        <v-select class="form-group" v-model="selected" :options="options"></v-select>
      </div>
    </fieldset>
    <div class="alert alert-danger error mb-3" v-show="error">Please select a Borrower's IC Number</div>
    <div class="d-flex justify-content-between col-sm-12">
      <button @click.prevent="validateBeforeSubmit" type="submit" class="btn btn-primary">Save</button>
      <button @click="clear" type="button" class="btn btn-primary ml-2">Clear</button>
    </div>
  </form>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { map, isEmpty } from "lodash";
import spacetime from "spacetime";
import { borrowedBooks, bookBorrowers } from "@/config/firebase";
import EventBus from "@/config/EventBus";

Vue.component("v-select", vSelect);

export default {
  name: "BorrowBookForm",
  data() {
    return {
      selected: null,
      error: false
    };
  },
  props: {
    isbn: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapGetters(["students"]),
    options() {
      const studentsMappedForOptions = map(this.students, (student, key) => ({
        id: parseInt(key),
        label: `${student.name} [${key}]`
      }));

      return studentsMappedForOptions;
    }
  },
  methods: {
    clear() {
      this.error = false;
      this.selected = null;
    },
    async assignBookAsBorrowed() {
      try {
        const borrowedBooksParams = {
          isbn: this.isbn,
          icno: this.selected.id,
          borrowed_at: spacetime.now().epoch
        };

        await borrowedBooks.addBorrowedBook(borrowedBooksParams);
      } catch (error) {
        /* eslint-disable-next-line*/
        console.log(error.code, error.message);
      }
    },
    async addBookBorrower() {
      try {
        const bookBorrowersParams = {
          isbn: this.isbn,
          icno: this.selected.id,
          borrowed_at: spacetime.now().epoch
        };

        await bookBorrowers.addBookBorrower(bookBorrowersParams);
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    },
    async validateBeforeSubmit() {
      this.error = false;

      if (isEmpty(this.selected)) {
        this.error = true;
        return;
      }

      try {
        await this.assignBookAsBorrowed();
        await this.addBookBorrower();
        EventBus.$emit("check-book-status");
        this.clear();
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    }
  }
};
</script>
