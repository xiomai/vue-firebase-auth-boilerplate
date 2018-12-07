<template>
  <div class="card border-secondary">
    <div class="card-header">Recently Borrowed Books</div>
    <div class="card-body p-0">
      <ul class="list-group">
        <li
          :key="book.key"
          v-for="book in recentBorrowedBooks"
          class="list-group-item d-flex justify-content-between align-items-center mx-0"
        >
          <p>ISBN:
            <router-link :to="{ name: 'manage.book', params: { isbn: book.key } }">{{book.key}}</router-link>
          </p>
          <span class="badge badge-primary badge-pill">
            <router-link
              :to="{ name: 'manage.student', params: { icno: book.icno } }"
            >Borower IC: {{book.icno}}</router-link>
          </span>
        </li>
        <li
          v-if="!recentBorrowedBooks.length"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="badge badge-warning badge-pill">No Borrowed Books.</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentBorrowedBooks",
  props: {
    recentBorrowedBooks: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
