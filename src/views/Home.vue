<template>
<div class="home">
<h1>Home</h1>
<p>Bienvenido: <b>  {{ name }} </b> </p>
<p>Su rol es:  <b> {{ rol }} </b> </p>
</div>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            name() {
                return  (this.$store.getters.user.name === '') ? 'Invitado' : this.$store.getters.user.name; 
            },
            rol() {
                return  (this.$store.getters.user.role === '') ? 'Invitado' : this.$store.getters.user.role; 
            }
        },
    }
</script>

