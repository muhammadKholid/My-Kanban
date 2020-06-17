<template>

  <div class="container">

    <div id="form-register" class="name">
      <h1>Register</h1>
      <form @submit.prevent="register()">
        <h3>Email</h3>
        <input type="text" placeholder="your email..." v-model="form.email">
        <h3>Password</h3>
        <input type="password" placeholder="your password..." v-model="form.password">
        <br></br>
        <div id="reg-button">
          <button  type="submit">Register</button>
        </div>
      </form>
      <br>
        <div id="reg-button">
          <button @click="goBack" type="button">Back</button>
        </div>
    </div>
  </div>

</template>


<script>

  import { url } from '../utils.js' 
  import Swal from 'sweetalert2'

  export default{
    name: 'Register',
    data(){
      return {
        form: {
          email:'',
          password:'',
        }
      }
    },
    methods: {
      register(){
        const newData = { email: this.form.email, password: this.form.password }
        fetch(`${url}/register`,{
          method: 'POST',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response=>{
            return response.json();
          })
          .then(newUser=>{
            if(newUser.message == 'email must be unique'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: newUser.message,
              footer: '<a href>Why do I have this issue?</a>'
            })
            } else if(newUser.message == 'Email harus diisi!') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: newUser.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            } else {
            this.form.email = '';
            this.form.password = '';
            if (newUser) {
              Swal.fire(
                'Registered',
                'success'
              )
            }
            this.$emit('checkLogin', 'sudahRegis')

            }
          })
          .catch(err=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Form tidak boleh kosong',
              footer: '<a href>Why do I have this issue?</a>'
            })
            console.log(err);
          })
      },
      goBack(){
        this.$emit('checkLogin', 'sudahRegis')
      }
    }
  }
</script>
