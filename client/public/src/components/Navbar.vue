<template>
  <div id="banner">
    <h1 class="banner">Kanban In De Hoooouse</h1>

    <button class="banner-logout" @click="logout()">Logout</button>
  </div>


</template>


<script charset="utf-8">
import Swal from 'sweetalert2'

  export default{
    name: 'Navbar',
    methods: {
      logout(){
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes!'
}).then((result) => {
        localStorage.clear();
        this.$emit('checkNumberLogout', 'tokenHilang')
  if (result.value) {
    Swal.fire(
      'Logout!',
      'success'
    )
  }
})
      }
    }
  }
</script>
