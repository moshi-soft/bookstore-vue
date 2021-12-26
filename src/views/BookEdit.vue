<template>
  <div class="hello">
    <h1> Edit Book</h1>
    <book-edit/>
  </div>
</template>
<script>
// @ is an alias to /src
import BookEdit from '@/components/BookEdit.vue'

export default {
  name: 'BookEditVeiw',
  components: {
    BookEdit
  }
}
</script>
