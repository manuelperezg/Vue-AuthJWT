<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Email" />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />
      <button type="submit">Login</button>
      <span>{{ loader }}</span>
    </form>
    <button @click="geDataSession">Obtener datos</button>
    <h2>{{ loader }}</h2>
    <pre class="language-json"><code>{{ user  }}</code></pre>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loader: "",
      user: {}
    };
  },
  created() {
    // this.login();
    // this.geDataSession();
    // this.login(this.user,thi);
  },
  methods: {
    geDataSession: function() {
      //  this.loader = 'cargando...';
      //http://localhost/loginAutomatic/index.php
      return this.$http({
        method: "POST",
        url: "https://smart.sportalsolerpalau.mx/QA/dist_pruebas/index.php",
        data: {
          clave: "U1BBODYxMjAxREs0"
        }
      })
        .then(
          response => ((this.user = response.data), console.log(response.data))
        )
        .catch(error => console.log(error));
    },
    async login() {
      //   let email = this.email;
      //   let password = this.password;
      // this.login(this.user.GBL_CORREO,this.user.GBL_PASS);
      // Cargar los datos
      await this.geDataSession();
      let email = this.user.GBL_CORREO;
      let password = this.user.GBL_PASS;
      if (email !== "" && password !== "") {
        this.$store
          .dispatch("login", { email, password })
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      }
      // this.loader = 'Carga finalizada';
    }
  },
  computed: {
    userNotEmpy() {
      if (this.user.length == 0) {
        console.log("empty");
      }
    },
    load() {
      return (this.loader = this.$store.state.status);
    }
  }
};
</script>