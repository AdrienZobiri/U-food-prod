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
    <div class="text-subtitle-1 noAccount " @click="goToSignUp()">No account ?<span
        class="text-subtitle-1 signUp">SignUp</span></div>
    <div class="red--text" :type="erno ? 'hidden' : 'text'"> {{ erno }} </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      erno: ''
    }
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await this.$axios.post(`/login`, data);
        await this.storeCookies(response.data);
        await this.$router.push('/');
        location.reload();
      } catch (error) {
        this.erno = "Bad credentials"
      }
    },
    async storeCookies(data) {
      await this.$cookies.set('token', data.token);
      await this.$cookies.set('id', data.id);
      await this.$cookies.set('email', data.email);
      await this.$cookies.set('name', data.name);
      await this.$cookies.set('rating', data.rating);
      await this.$cookies.set('followers', data.followers);
      await this.$cookies.set('following', data.following);
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
