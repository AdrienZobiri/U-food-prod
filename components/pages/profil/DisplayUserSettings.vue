<template>
    <v-card class="d-flex flex-column align-center pa-3" v-if="token">
        <v-card-title >{{ profileName }}</v-card-title>
        <v-card-text class="text-center">Score: {{ score }}</v-card-text>
    </v-card>
    <div v-else>
        <login @login="update()"/>
    </div>
</template>

<script>
import login from "@/components/pages/profil/login.vue";
export default {
    name: 'DisplayUserSettings',
    components: {
        login
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
        }
    }
}
</script>
