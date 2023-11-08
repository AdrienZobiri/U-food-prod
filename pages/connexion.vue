<template>
  <v-col class="d-flex flex-column align-center pa-2">
    <v-row class="text-h2">
      Connexion
    </v-row>
    <v-row class="d-flex flex-column px-0">
      <v-col>
        <v-text-field v-if="regis" v-model="username" label="Name" />
      </v-col>
      <v-col>
        <v-text-field v-model="email" name="email" label="Email"
          :rules="[v => !!v || 'Email required', v => /.+@.+\..+/.test(v) || 'Email invalid']" required />
      </v-col>
      <v-col>
        <v-text-field v-model="password" name="password" label="Password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'" :rules="[v => !!v || 'Password required']" required
          @click:append="show = !show" />
      </v-col>
      <v-col>
        <v-switch v-model="regis" :label="`Crée un compte ?`" />
      </v-col>
      <v-col class="d-flex justify-center my-4">
        <v-btn :disabled="!password" color="blue" class="text-h4 pa-6" @click="sender">
          {{ regis ? 'Register' : 'Login' }}
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-center my-4">
        <div class="red--text" :type="erno ? 'hidden' : 'text'">
          {{ erno }}
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import qs from 'querystring';
export default {
  name: "DisplayConnexion",
  data() {
    return {
      email: '',
      password: '',
      username: '',
      erno: '',
      valid: false,
      show: false,
      regis: false,
      rules: {
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    }
  },
  async mounted() {
    await this.load();
  },
  methods: {
    async load() {
      if (this.$cookies.get('token')) {
        this.$router.push('/');
      }
    },
    async sender() {
      if (this.regis) {
        await this.register()
      } else {
        await this.login()
      }
    },
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password
        };
        const response = await this.$axios.post(`/login`, data);
        if (response.data.id && response.data.name) {
          await this.storeCookies(response.data);
          this.$router.push('/');
        } else {
          this.erno = "Internal server error"
        }
      } catch (error) {
        this.erno = "Bad credentials"
      }
    },
    async register() {
      try {
        const data = {
          name: this.username,
          email: this.email,
          password: this.password
        };
        const response = await this.$axios.post(`/signup`, data);
        if (response.data.id && response.data.name)
          await this.login()
        else
          this.erno = "Erreur d'enregistrement"
      } catch (error) {
        this.erno = "Account already exist"
      }
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
  }
}
</script>
