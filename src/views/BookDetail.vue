<template>
  <div class="hello">
    <h1>Book Detail</h1>
    <book-detail/>
  </div>
</template>
<script>
// @ is an alias to /src
import BookDetail from '@/components/BookDetail.vue'

export default {
  name: 'BookDetailVeiw',
  components: {
    BookDetail
  }
}
</script>
