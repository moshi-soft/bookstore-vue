<template>
  <div class="hello">
    
    <h1>Add New Book</h1>
    <book-add/>
  </div>
</template>
<script>
// @ is an alias to /src
import BookAdd from '@/components/BookAdd.vue'

export default {
  name: 'BookAddVeiw',
  components: {
    BookAdd
  }
}
</script>
