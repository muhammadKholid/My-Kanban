<template>

  <div class="container">
    <div id="form-login" class="name" v-if="isRegister">
      <h1>Login</h1>
      <form @submit.prevent="login()" id="login" action="" method="post">
        <h3>Email</h3>
        <input type="text" for="email" placeholder="your email..." v-model="form.email">
        <h3>Password</h3>
        <input type="password" for="password" placeholder="your password..." v-model="form.password">
        <br></br>

        <div class="login-btn">
          <button type="submit">Login</button>
          <button type="button" @click="google">
            Google
          </button>
        </div>
        <div>

          <p class="signup-text">Not registered ? <a @click="register">Create an account</a></p>
        </div>
      </form>
    </div>
    <Register v-else @checkLogin="back"></Register>
  </div>

</template>

<script>

  import Swal from 'sweetalert2'
  import { url } from '../utils.js' 
  import Register from '../components/Register.vue'

  export default{
    name: 'Login',
    components: {
      Register,
    },
    data(){
      return {
        isRegister: true,
        form : {
          email:'',
          password:'',
        },
      }
    },
    methods: {
      login(){
        fetch(`${url}/login`, {
          method: 'POST',
          body: JSON.stringify(this.form),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response=>{
            return response.json();
          })
          .then(theUser=>{

            if(theUser.message == 'email must be unique'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: theUser.message,
              footer: '<a href>Why do I have this issue?</a>'
            })
            } else if(theUser.message == 'Email harus diisi!') {
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: theUser.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            } else if(theUser.message == 'Data not found') {
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: theUser.message,
              footer: '<a href>Why do I have this issue?</a>'
            })

            }else {
              console.log(theUser)
              Swal.fire(
                'Login!',
                'success'
              )
            localStorage.setItem('token', theUser.token)
            this.form.email = '';
            this.form.password = '';
            this.$emit('checkNumberForPage', true)
            }
          })
          .catch(err=>{
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Error!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          })
      },
      register(){
        this.isRegister = false;
      },
      back(){
        this.isRegister = true;
      },
      google(){
        let profile = null
        this.$gAuth.signIn()
          .then(res => {
            let id_token = res.getAuthResponse().id_token
            profile = res.getBasicProfile()
            return fetch(`${url}/google`, {
              method: 'POST',
              body: JSON.stringify({token : id_token}),
              headers: {
                'Content-Type': 'application/json',
              },
            })
          })
          .then(response=>{
            return response.json();
          })
          .then(data => {
            if (data) {
              Swal.fire(
                'Login!',
                'success'
              )
            }
            localStorage.setItem('token', data.token)
            this.$emit('checkNumberForPage', true)
          })
          .catch(err=>{
            console.log(err);
          })
    },
  }
}
</script>
