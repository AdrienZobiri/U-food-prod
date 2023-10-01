<template>
    <div>
        <v-card class="d-flex flex-column align-center pa-3" v-if="token">
            <v-icon size="100">mdi-account-circle</v-icon>
            <v-card-title >{{ profileName }}</v-card-title>
            <v-card-text class="text-center">Score: {{ score }}</v-card-text>
        </v-card>
        <div class="d-flex align-end justify-space-around mt-4">
            <v-btn @click="logout">
                Deconnexion
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-btn @click="backToHome">
                Back to home
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import login from "@/components/pages/profil/login.vue";
export default {
    name: 'DisplayUserSettings',
    components: {
        login
    },
    watch: {
        $route() {
           this.loadCookies();
        }
    },
    data() {
        return {
            profileName: '',
            score: 0,
            token: ''
        }
    },
    mounted() {
        this.loadCookies()
    },
    methods: {
        loadCookies() {
            this.token = this.$cookies.get('token')
            this.score = this.$cookies.get('rating')
            this.profileName = this.$cookies.get('name')
        },
        async logout() {
            const response = await this.$axios.post('/logout');
            await this.eraseCookies();
            location.reload();
        },
        async eraseCookies() {
            this.$cookies.set('token', '');
            this.$cookies.set('id', '');
            this.$cookies.set('email', '');
            this.$cookies.set('name', '');
            this.$cookies.set('rating', '');
            this.$cookies.set('followers', '');
            this.$cookies.set('following', '');
        },
        backToHome() {
            this.$emit("close")
            this.$router.push('/')
        }
    }
}
</script>
