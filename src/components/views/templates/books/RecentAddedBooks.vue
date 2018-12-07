<template>
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
          <span class="badge badge-primary badge-pill">
            <router-link
              :to="{ name: 'manage.book', params: { isbn: book.key } }"
            >ISBN: {{book.key}}</router-link>
          </span>
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
</template>

<script>
export default {
  name: "RecentAddedBooks",
  props: {
    recentBooks: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
