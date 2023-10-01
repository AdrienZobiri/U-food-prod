<template>
    <v-col>
        <v-row class="text-h2 ma-3">
            Connexion
        </v-row>
        <!-- :rules="[v => !!v || 'Confirm Password required', v => v === password || 'Passwords do not match']" -->
        <!-- :disabled="regis ? false : true" :required="regis ? false : true" type="password" -->
        <v-row class="d-flex justify-center mb-4" align="center">
            <v-text-field v-if="regis" v-model="username" label="Name" />
        </v-row>
        <v-row class="d-flex justify-center mb-4" align="center">
            <v-text-field v-model="email" name="email" label="Email"
                :rules="[v => !!v || 'Email required', v => /.+@.+\..+/.test(v) || 'Email invalid']" required />
        </v-row>
        <v-row class="d-flex justify-center mb-4" align="center">
            <v-text-field v-model="password" name="password" label="Password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
                :rules="[v => !!v || 'Password required']" required @click:append="show = !show" />
        </v-row>
        <v-switch v-model="regis" :label="`Crée un compte ?`" />
        <v-row class="d-flex justify-center my-4" align="center">
            <v-btn :disabled="!password" color="blue" class="text-h4 pa-6" @click="sender">
                {{ regis ? 'Register' : 'Login' }}
            </v-btn>
        </v-row>
        <v-row class="d-flex justify-center my-4" align="center">
            <div class="red--text" :type="erno ? 'hidden' : 'text'">
                {{ erno }}
            </div>
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
            const params = {
                email: this.email,
                password: this.password
            };

            try {
                const response = await this.$axios.post('/login', params);

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
            const params = {
                name: this.username,
                email: this.email,
                password: this.password
            };
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const formData = qs.stringify(formData, config);

            try {
                const response = await this.$axios.post('/signup', params);

                if (response.data.id && response.data.name) {
                    await this.login()
                } else {
                    this.erno = "Erreur d'enregistrement"
                }
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
