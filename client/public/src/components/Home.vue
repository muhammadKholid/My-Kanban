<template>

  <div class="highest-container">
    <div class="high-container">
      <Navbar @checkNumberLogout=logout></Navbar>
      <div class="con-title">
        <h2 class="title-actions">Add Your Task here</h2> 
      </div>

      <div class="con-content">
        <AddForm @newTaskFromChild="addedTask"></AddForm>
      </div>
    </div>


    <div class="high-container1">


      <div class="container" v-for="(category, index) in categories" :key="index">

        <Box
          :task="tasks"
          :category="category"
          @editDone="editDone"
          @remove="remove"
          >

        </Box>

      </div>
    </div>
  </div>

</template>


<script charset="utf-8">
import { url } from '../utils.js' 
import AddForm from './AddForm.vue'
import Navbar from './Navbar.vue'
import Box from './Box.vue'

export default{ 
  name: "Home",
  components: {
    Box,
    AddForm,
    Navbar,
  },
  data(){
    return {
      tasks: [],
      categories: [{title: "Backlog", color:"0"}, {title: "Todo", color:"1"}, {title: "Done", color:"2"}, {title: "Completed", color:"3"}]
    }
  },
  created(){
    this.getTasks();
  },
  methods: {
    getTasks: function(){
      fetch(`${url}/tasks`, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        }
      })
      .then(response=>{
        return response.json();
      })
      .then(dataTasks=>{
        this.tasks = dataTasks.data;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    logout(payload){
      this.$emit('checkNumberLogout', payload)
    },
    addedTask(payload){
      this.getTasks();
    },
    editDone(payload){
      this.getTasks();
    },
    remove(payload){
      this.getTasks();
    }
  }
}
</script>
<style>
.high-container{
  margin: 0;
  background-color:#2d2d2d;
  padding: 1rem 1.6rem 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.high-container1{
  margin: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border : 3px solid black;
}
.title-actions{
  color: #f5f5f5;
}
</style>
