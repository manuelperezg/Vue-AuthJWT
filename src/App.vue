<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="isLoggedIn" to="/guest">Guest Page |</router-link> 
      <router-link v-if="isLoggedIn && role == 'admin' " to="/admin">Admin Page |</router-link> 
      <router-link v-if="isLoggedIn" to="/resources"> Resources |</router-link>
      <router-link to="/about">About |</router-link>
      <span v-if="isLoggedIn"> <a @click="logout" > Salir </a></span>
      <span v-else> <router-link to="/login"> Entrar </router-link></span>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    data() {
      return {
        role: ''
      }
    },
    isLoggedIn: function() {
      this.role = this.$store.getters.user.role;
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
   async logout () {
      await this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "about" });
      }).catch( (error)=> console.log(error))
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
