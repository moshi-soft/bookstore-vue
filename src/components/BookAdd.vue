<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3 v-if="isSuccess" style="color:green">
      Successfully added new book
    </h3>
     <router-link to="/books">Back to List</router-link>
     <br><br><br>
     <!-- <form @submit.prevent="submitForm" method="POST"  action="https://localhost:44344/api/Books/api/Books/add-book-with-authors"> -->
      <label for="title">Book Name</label>
      <input name="title" type="input" id="title" v-model="form.title">
      <br><br>
      <label for="description">Book Name</label>
      <textarea name="description" v-model="form.description" id="description" cols="30" rows="10"></textarea>
      <br><br>
      <label for="publisher_id">Select Publisher</label>
      <select name="publisherId" v-model="form.publisherId" id="publisher_id">
        <option value="" selected>Select Publisher</option>
        <option v-for="publisher in publishers" :key="publisher.id" :value="publisher.id">{{publisher.name}}</option>
      </select>
      <br><br>
      <label for="author_ids">Select Authors</label>
      <select name="authorIds[]" v-model="form.authorIds" id="author_ids" multiple>
        <option v-for="author in authors" :key="author.id" :value="author.id">{{author.fullName}}</option>
      </select>
      <br><br>
      <button @click.prevent="submitForm">Submit</button>
    <!-- </form> -->
  </div>
</template>

<script>
//import {router} from 'vue-router'
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
    //alert(this.bookDetailId)
  },
  data(){
    return {
      isSuccess:false,
      publishers:[],
      authors:[],
      form:{
          title: '',
          description: '',
          publisherId: '',
          authorIds: []
      }
    }
  },
  methods:{
    getPublishers: function(){
      this.axios.get('https://localhost:44344/api/Publishers/').then((response) => {
        this.publishers = response.data;
      })
    },
    getAuthors: function(){
      this.axios.get('https://localhost:44344/api/Authors/').then((response) => {
        this.authors = response.data;
      })
    },
    submitForm: function(){
     console.log(this.form)
     let self = this;
      this.axios({
                    method: 'post',
                    url: 'https://localhost:44344/api/Books/add-book-with-authors',
                    data: this.form
                })
                .then(function (response) {
                  self.isSuccess = true
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(JSON.stringify(error))
                })
              .finally(() => {
                  //props.msg = 'Successfully Updated!';
              });
    }
  },
  beforeMount(){
    this.getPublishers();
    this.getAuthors();
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
