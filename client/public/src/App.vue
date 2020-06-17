<template>
  <div class="par-container">
    <Home @checkNumberLogout="logout" v-if="isLogin"></Home>
    
    <div v-else>
      <Login @checkNumberForPage="checkLogin" ></Login>
    </div>
  </div>

</template>


<script charset="utf-8">
import Login from './components/Login'
import Home from './components/Home'
export default{ 
  name: "App",
  data(){
    return {
      isLogin: false,
    }
  },
  components: {
    Login,
    Home,
  },
  created(){
    this.checkToken();
  },
  methods: {
    checkToken(){
    const token = localStorage.getItem('token');
    console.log(token);
      if(token){
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    checkLogin(payload){
      if(payload){
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    logout(payload){
      if(payload){
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
  }
}
</script>
