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
        <p class="text-center">
          <span v-show="!isBookBorrowed" class="badge badge-primary">Available</span>
          <span v-show="isBookBorrowed" class="badge badge-warning">On Borrow</span>
        </p>
        <div v-if="!isBookBorrowed">
          <BorrowBookForm v-if="showForm" :isbn="routeISBN"/>
        </div>
        <div v-else>
          <p>
            <strong>Borrowed At :</strong>
            {{ borrowedDateTime }}
          </p>
          <p v-if="student">
            <strong>Borrowed By :</strong>
            <router-link
              :to="{ name: 'manage.student', params: { icno: borrowedBook.icno } }"
            >{{ student.name }} [{{ borrowedBook.icno}}]</router-link>
          </p>
          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-primary m-1"
              v-show="!confirmReturn"
              @click="confirmBookReurn"
            >Mark Returned</button>
            <button
              type="button"
              class="btn btn-light m-1"
              v-show="confirmReturn"
              @click="cancelBookReurn"
            >Cancel</button>
            <button
              type="button"
              class="btn btn-warning m-1"
              v-show="confirmReturn"
              @click="markAsBookReturned"
            >Confirm Returned</button>
          </div>
        </div>
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
import spacetime from "spacetime";
import {
  books,
  borrowedBooks,
  students,
  bookBorrowers
} from "@/config/firebase";
import PageContenHeader from "@/components/PageContentHeader";
import BorrowBookForm from "@/components/forms/books/BorrowBookForm";
import EventBus from "@/config/EventBus";

export default {
  name: "Book",
  data() {
    return {
      book: null,
      borrowedBook: null,
      student: null,
      showForm: false,
      confirmReturn: false
    };
  },
  components: {
    PageContenHeader,
    BorrowBookForm
  },
  computed: {
    routeISBN() {
      return parseInt(this.$route.params.isbn);
    },
    isBookLoaded() {
      return !isEmpty(this.book);
    },
    isBookBorrowed() {
      return !isEmpty(this.borrowedBook);
    },
    borrowedDateTime() {
      return this.borrowedBook.borrowed_at
        ? spacetime(this.borrowedBook.borrowed_at).format("yyyy.MM.dd h:mm a")
        : "Invalid Epoch Time saved";
    }
  },
  methods: {
    confirmBookReurn() {
      this.confirmReturn = true;
    },
    cancelBookReurn() {
      this.confirmReturn = false;
    },
    async getBook() {
      try {
        const book = await books.onceGetBook(this.routeISBN);
        this.book = book.val();
      } catch (error) {
        /* eslint-disable-next-line*/
        console.log(error.code, error.message);
      }
    },
    async getStudent() {
      try {
        const student = this.borrowedBook
          ? await students.onceGetStudent(this.borrowedBook.icno)
          : null;
        this.student = student.val() || null;
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    },
    async getStudents() {
      try {
        const snapshot = await students.onceGetStudents();
        this.$store.dispatch("setStudents", snapshot.val());
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    },
    async getBorrowedBook() {
      try {
        const borrowedBookSnapshot = await borrowedBooks.onceGetBorrowedBook(
          this.routeISBN
        );
        this.borrowedBook = borrowedBookSnapshot.val();
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    },
    async removeBookBorrowed() {
      try {
        await borrowedBooks.removeBorrowedBook(this.routeISBN);
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    },
    async removeBorrowersBookBorrowed() {
      try {
        const params = {
          isbn: this.routeISBN,
          icno: this.borrowedBook.icno
        };
        await bookBorrowers.removeBookBorrowed(params);
      } catch (error) {
        /* eslint-disable-next-line */
        console.log(error.code, error.message);
      }
    },
    async markAsBookReturned() {
      await this.removeBookBorrowed();
      await this.removeBorrowersBookBorrowed();

      this.enableForm();
      await this.init();
    },
    async init() {
      await this.getBook();
      await this.getBorrowedBook();
      await this.getStudent();
    },
    enableForm() {
      this.confirmReturn = false;
      this.showForm = true;
    }
  },
  async created() {
    await this.init();

    if (!this.isBookBorrowed) {
      this.getStudents();
      this.enableForm();
    }
  },
  beforeDestroy() {
    EventBus.$off(["check-book-status"]);
  },
  mounted() {
    EventBus.$on("check-book-status", () => {
      this.init();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
