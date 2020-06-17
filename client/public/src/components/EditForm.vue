<template>
      <form @submit.prevent="editTask()" method="post">
        <label>Title</label>
        <input class="input-task" type="text" v-model="form.title">
        <label>Category</label>
        <select v-model="form.category" class="form-control" required>
          <option>Back Log</option>
          <option>Todo</option>
          <option>Done</option>
          <option>Completed</option>
        </select>
        <div>
          
        <button class="edit-btn" type="submit">Edit Task</button>
        </div>
      </form>

</template>


<script charset="utf-8">
  import { url } from '../utils.js'
  import Swal from 'sweetalert2'
  export default({
    name: "EditForm",
    data(){
      return {
        form: {
          id: '',
          title:'',
          category:'',
        }
      }
    },
    props: ['edit'],
    watch: {
      edit(){
        this.form.id = this.edit.id;
        this.form.title = this.edit.title;
        this.form.category = this.edit.category;
      }
    },
    methods: {
      editTask(){
      const edited = {
        title: this.form.title,
        category: this.form.category,
      }
        fetch(`${url}/tasks/${this.form.id}`,{
          method: 'PUT',
          body: JSON.stringify(edited),
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          }
        })
        .then(response=>{
          return response.json();
        })
        .then(editedData=>{
if (editedData) {
    Swal.fire(
      'File Edited!',
      'success'
    )
  }
          this.$emit('editDone', editedData);
          this.form.title = '';
          this.form.category = '';
        })
        .catch(err=>{
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Form harus terisi',
})
        })

      }
    }
  })
</script>
