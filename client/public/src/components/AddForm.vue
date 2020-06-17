<template>
      <form @submit.prevent="addTask()" class="form-add" method="post">
        <input class="input-task" type="text" v-model="form.title">
        <button id="add-btn" type="submit">Add Task</button>
      </form>
</template>

<script>
  import { url } from '../utils.js' 
  import Swal from 'sweetalert2'
  export default({
    name: "AddForm",
    data(){
      return{
        form: {
          title:'',
          category:'Backlog',
        }
      }
    },
    methods: {
      addTask(){
        const newTask = { title: this.form.title, category: this.form.category }
        fetch(`${url}/tasks`, {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          }
        })
          .then(response=>{
            return response.json();
          })
          .then(newData=>{
            if (newData) {
              Swal.fire(
                'Added Data',
                'success'
              )
            }
            this.$emit("newTaskFromChild", newData);
            this.form.title='';
          })
          .catch(err=>{
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Form tidak boleh kosong',
              footer: '<a href>Why do I have this issue?</a>'
            })
          })
      }
    }
  })
</script>

<style>
.form-add{
  background-color: #2d2d2d;
}
</style>
