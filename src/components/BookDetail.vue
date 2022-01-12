<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <router-link to="/">Back to List</router-link>
   <table>
     <thead style="background:skyblue">
       <tr>
        <th>Book Name</th>
        <th>Description</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>Publish Status</th>
        <th>Publish Date</th>
        <th>Is Available</th>
       </tr>
     </thead>
     <tbody>
        <tr>
            <td>{{book.title}}</td>
            <td>{{book.description}}</td>
            <td>
              <div v-for="(author, index) in book.authorNames" :key="index">
                {{author}}
              </div>
            </td>
            <td>
              {{book.publisherName}}
            </td>
            <td>
              <span v-if="book.isPublished">Yes</span>
              <span v-else>No</span>
            </td>
            <td>
              <span v-if="book.isPublished">
                <!-- {{book.datePublished}} -->
                {{this.convertDatetimeToDate(book.datePublished)}}
              </span>
              
            </td>
            <td>
              <span v-if="book.isAvaille">Yes</span>
              <span v-else>No</span>
            </td>
        </tr>
     </tbody>
     
   </table>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
export default {
  name: 'Book',
  props: {
    msg: String,
  },
  // setup(){
  //   const route = useRoute()
  //   this.bookDetailId = route.params.id
  // },
  mounted(){
    const route = useRoute()
    this.bookDetailId = route.params.id
    this.getBookDetail()
    //alert(this.bookDetailId)
  },
  data(){
    return {
      bookDetailId:null,
      book:[]
    }
  },
  methods:{
    getBookDetail: function(){
     // selff = this;
      //alert('ok')
      this.axios.get('https://localhost:44344/api/Books/'+this.bookDetailId)
      .then((response) => {
        this.book = response.data;
        //console.log(response.data)
      })
      .catch((error)=>{
        if(error.response && error.response.status == 404){
          this.$router.push({
            name: "404",
            params: { resource: "book" }
          });
        }else{
           this.$router.push({
            name: "network-issue"
          });
        }
        
      })
      // .catch(function (error) {
      //     console.log(error);
      //     selff.$router.push({
      //     name: "404",
      //     params: { resource: "book" }
      //   });
      // })
      //.catch((=> next({name:'404',params:{resource:'book '}})))
    },
    convertDatetimeToDate:function(datetime){
      datetime = new Date(datetime);
      return datetime.getDate() + "/" + (datetime.getMonth() + 1) + "/" + (datetime.getFullYear());
    }
  },
  beforeMount(){
    
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
