<template>
    <div class="content">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button @click="login()" class="loginBtn">Login</button>
        <div class="text-subtitle-1 noAccount " @click="goToSignUp()">No account ?<span class="text-subtitle-1 signUp">SignUp</span></div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async login() {
            const params = {
                email: this.email,
                password: this.password
            };
            const response = await this.$axios.post('/login', params);
            await this.storeCookies(response.data);
            this.$router.push('/');
            location.reload();
        },
        async storeCookies(data) {
            this.$cookies.set('token', data.token);
            this.$cookies.set('id', data.id);
            this.$cookies.set('email', data.email);
            this.$cookies.set('name', data.name);
            this.$cookies.set('rating', data.rating);
            this.$cookies.set('followers', data.followers);
            this.$cookies.set('following', data.following);
        },
        goToSignUp() {
            this.$router.push('/connexion')
        }
    }
}
</script>


<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

label::before {
    display: none;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
}

.form-control {
    border: 1px solid #ffffff;
    padding: 10px;
    color: #ffffff;
    margin-top: 10px;
}

.loginBtn {
    margin-top: 15px;
    border: 1px solid #ffffff;
    padding: 10px;
    color: #ffffff;
    background-color: #000000;
}

.loginBtn:hover {
    background-color: #ffffff;
    color: #000000;
}

.noAccount {
    margin-top: 15px;
    color: #ffffff;
    font-size: 20px;
}

.signUp {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
    color: #3a8cc3;
}
</style>
