<template>
<div>
    <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>Email</label>
    <input  v-model="email" type="email" placeholder="Email" />
    <label>Password</label>
    <input  v-model="password" type="password" placeholder="Password"/>
    <hr/>
    <button type="submit">Login</button>
    <span> {{ loader }} </span>
    </form>
</div>
</template>
<script>
export default {
    data() {
    return {
        email: "",
        password: "",
        loader:""
    };
    },
    methods: {
    login: function() {
        let email = this.email;
        let password = this.password;
        // let email = "jose@it.mx";
        // let password = "manuel";

        
        this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    },
    computed: {
        load() {
            return this.loader =  this.$store.state.status; 
        }
    },
    
};
</script>