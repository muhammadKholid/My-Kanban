<template>

  <div class="highest-container">
    <div class="high-container">
      <Navbar @checkNumberLogout=logout></Navbar>
      <div class="con-title title-1">
        <h2 class="title">Actions</h2> 
      </div>

      <div class="con-content">
        <AddForm @newTaskFromChild="addedTask"></AddForm>
      </div>
    </div>


    <div class="high-container">


      <div class="container" v-for="(category, index) in categories" :key="category">

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
      categories: ["Backlog", "Todo", "Done", "Completed"]
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
