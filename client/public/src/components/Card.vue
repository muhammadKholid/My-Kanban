<template>
  <div class="card" :class="{ 'card-active' : checkUser }">
    <div v-if="page" class="info">
      <h3 class="title-info">{{ item.title }}</h3>
      <div class="action-btn">
        <button @click="deleteTask(item.id)" class="delete-btn" type="button">X</button>
        <button @click="editTask(item.id)" class="edit-btn" type="button">Edit</button>
      </div>
    </div>
    <div v-else class="action">
        <EditForm :edit="gonnaEdit" @editDone="editDone"></EditForm>
    </div>
  </div>

</template>


<script charset="utf-8">
import EditForm from './EditForm.vue'
import { url } from '../utils.js'
import Swal from 'sweetalert2'

export default{
  name: 'card',
  components: {
    EditForm,
  },
  data(){
    return {
      gonnaEdit:[],
      page: true,
    }
  },
  props: [ "item" ],
  computed: {
      checkUser(){
        const loggedUser = localStorage.getItem('userId')
        const dataId = this.item.UserId
        if (loggedUser == dataId){
          return true
        } else {
          return false
        }
      }
    },
  methods: {
    deleteTask(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
           return fetch(`${url}/tasks/${id}`, {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json',
              token : localStorage.getItem('token'),
              }
            })
        }
      })
      .then(response=>{
        return response.json()
      })
      .then(deleted=>{
      this.page = true;
        this.$emit('remove', id)
        Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
      })
      .catch(console.log)
    },
    editTask(id){
    this.page = false;
      fetch(`${url}/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        }
      })
      .then(response=>{
        return response.json();
      })
      .then(willEdit=>{
        this.gonnaEdit = willEdit.data;
      })
      .catch(console.log)
    },
    editDone(payload){
      this.$emit('editDone', payload);
    }
  }
}
</script>
