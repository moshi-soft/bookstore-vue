<template>
  <div class="bookList">
    <h1>Books List</h1>
    <Book/>
  </div>
</template>
<script>
// @ is an alias to /src
import Book from '@/components/BooksList.vue'

export default {
  name: 'Books',
  components: {
    Book
  }
}
</script>
