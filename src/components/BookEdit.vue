<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3 v-if="isSuccess" style="color:green">
      Successfully updated book
    </h3>
     <router-link to="/">Back to List</router-link>
     <br><br><br>
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
      <label for="available">Available</label>
      <input v-if="form.isAvaille" checked name="isAvailable" type="radio" value="true" id="available" v-model="form.IsAvaille">
      <input v-else name="isAvailable" type="radio" value="true" id="available" v-model="form.IsAvaille">

      <label for="not_available">Not Available</label>
      <input v-if="!form.isAvaille" checked name="isAvailable" value="false" type="radio" id="not_available" v-model="form.IsAvaille">
      <input v-else name="isAvailable" value="false" type="radio" id="not_available" v-model="form.IsAvaille">
      <br><br>
      <label for="isPublished">Has Published?</label>
      <input name="isPublished" type="checkbox" value="1" id="isPublished" v-model="form.isPublished">
      <br><br>
      <div v-if="form.isPublished">
      <label for="publishDate">Published Date</label>
      <input name="publishDate" type="date" id="publishDate" v-model="publishDate">
      </div>
      <br><br>
      <button @click.prevent="submitForm">Update</button>
  </div>
</template>

<script>
//import {router} from 'vue-router'
import {useRoute} from 'vue-router'
export default {
  name: 'BookEdit',
  props: {
    msg: String,
  },
  mounted(){
    const route = useRoute()
    this.bookEditId = route.params.id
    this.getBookById()
    //alert(this.bookDetailId)
  },
  data(){
    return {
      isSuccess:false,
      bookEditId:'',
      publishers:[],
      publishDate:'',
      authors:[],
      form:{
          title: '',
          description: '',
          publisherId: '',
          isAvaille : '',
          isPublished : '',
          datePublished : '',
          authorIds: []
      }
    }
  },
  methods:{
    getPublishers: function(){
      this.axios.get('https://localhost:44344/api/Publishers/')
      .then((response) => {
        this.publishers = response.data;
      })
      
    },
    getAuthors: function(){
      this.axios.get('https://localhost:44344/api/Authors/').then((response) => {
        this.authors = response.data;
      })
    },
    getBookById: function(){
      this.axios.get('https://localhost:44344/api/Books/'+this.bookEditId).then((response) => {
        
        this.form = response.data;
        if(this.form.isPublished){
          this.convertDbDateToFormDate(this.form.datePublished);
        }
      })
    },
    submitForm: function(){
     console.log(this.form)
     let self = this;
     if(this.form.isPublished){
       this.convertDatetFormatToDbDate(this.publishDate)
     }else{
       this.form.datePublished='';
     }
      this.axios({
                    method: 'put',
                    url: 'https://localhost:44344/api/Books/update-book-with-authors/'+this.bookEditId,
                    data: this.form
                })
                .then(function (response) {
                  self.isSuccess = true
                    console.log(response);
                })
                .then(()=>{
                  this.$router.push({name:'Books'})
                })
                .catch(function (error) {
                    console.log(error);
                    alert(JSON.stringify(error))
                })
              .finally(() => {
                  //props.msg = 'Successfully Updated!';
              });
    },
    convertDatetFormatToDbDate:function(dateF){
      dateF = new Date(dateF);
      this.form.datePublished = dateF.getFullYear() + "-" + (dateF.getMonth() + 1) + "-" + (dateF.getDate());
    },
    convertDbDateToFormDate(dateF){
      //dateF = new Date(dateF);      
      //this.publishDate = (dateF.getMonth() + 1) + "/" + dateF.getUTCDate() + "/" + (dateF.getFullYear());
      var now = new Date(dateF);
          this.publishDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
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
