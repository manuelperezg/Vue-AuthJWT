<template>
  <div class="home">
    <h1>Home</h1>
    <p>
      Bienvenido:
      <b>{{ name }}</b>
    </p>
    <p>
      Su rol es:
      <b>{{ rol }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
     name() {
      let username = this.$store.getters.user.name;
    //   console.log(username);
      return  username === "" ? "Invitado" : username;
    },
     rol() {
      let role = this.$store.getters.user.role;
    //   console.log(role === "");
      return role === "" ? "Invitado" : role;
    }
  }
};
</script>

