<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <router-link style="margin-right:20px" to="/books/new">Add New Book</router-link> |
   <table>
     <thead style="background:skyblue">
       <tr>
         <th>#</th>
        <th>Book Name</th>
        <th>Description</th>
        <th>Action</th>
       </tr>
     </thead>
     <tbody>
        <tr v-for="(book, indexx) in books" :key="book.id">
          <td>{{++indexx}}</td>
            <td>{{book.title}}</td>
            <td>{{book.description}}</td>
            <td>
               <!-- <router-link to="/books/anil">Detail</router-link> -->
              <router-link :to="`/books/${book.id}/detail`">Detail</router-link> |
              <router-link :to="`/books/${book.id}/edit`" style="margin-right:20px;color:green">Edit</router-link> |
              <a href="#" @click.prevent="deleteBookRecord(book)" style="margin-right:20px;color:red">Delete</a>
            </td>
        </tr>
     </tbody>
     
   </table>
  </div>
</template>

<script>
export default {
  name: 'Books',
  props: {
    msg: String,
  },
  data(){
    return {
      books:[]
    }
  },
  methods:{
    getList: function(){
      //alert('ok')
      this.axios.get('https://localhost:44344/api/Books').then((response) => {
        this.books = response.data;
        console.log(response.data)
      })
      .catch(function (error) {
        //alert('error')
          console.log(error.response.status);
          if(error.response.status == 401){
            alert('You are not logged in please logged in first')
          }
         
      })
},
    deleteBookRecord(record){
      if(!confirm('Are you sure to delete?')){
        return false
      }
      let self = this;
      this.axios({
                    method: 'DELETE',
                    url: 'https://localhost:44344/api/Books/'+record.id,
                })
                .then(function (response) {
                  //self.books.splice(record.id, 1);
                  self.getList();
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                   // alert(JSON.stringify(error))
                })
              .finally(() => {
                  //props.msg = 'Successfully Updated!';
              });
     // alert(record.id)
    }
  },
  beforeMount(){
    this.getList()
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table{
  width: 80%;
}
tr th{
	font-weight:bold;
    }
tr th, tr td{
	padding:5px;
}
th{
    border: 5px solid #C1DAD7;
}
td{
	border: 5px solid #C1DAD7;
}
.c1{
	background:#4b8c74;
}
.c2{
	background:#74c476;
}
.c3{
	background:#a4e56d;
}
.c4{
	background:#cffc83;
}
</style>
