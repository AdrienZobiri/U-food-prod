<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
<template>
    <v-app dark dense flat outlined rounded>
        <div>
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-icon @click.stop="leftDrawer = !leftDrawer">mdi-account</v-icon>
                <v-spacer></v-spacer>
                <div @click="pushIndex" class="text-h3 cursor">U-Food</div>
                <v-spacer></v-spacer>
                <v-icon @click.stop="rightDrawer = !rightDrawer">mdi-star</v-icon>
                <v-spacer></v-spacer>
            </v-app-bar>
            <!-- Account bar right -->
            <v-navigation-drawer v-model="leftDrawer" absolute left temporary width="500">
                <div class="d-flex justify-end fixed">
                    <v-btn @click="back" class="d-flex justify-end ">
                        <v-icon @click="back">mdi-arrow-right-thick</v-icon>
                    </v-btn>
                </div>
                <DisplayUserSettings @update="update()" />
                <div v-if="leftDrawer" class="d-flex align-end justify-center mt-4">
                    <v-btn @click="logout" v-if=(token)>
                        Deconnexion
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </div>
                <DisplayHistory @close="leftDrawer = false" />
            </v-navigation-drawer>

            <!-- Favorite bar left -->
            <v-navigation-drawer v-if="rightDrawer" v-model="rightDrawer" absolute right temporary>
                <v-btn @click="back" v-if="rightDrawer">
                    <v-icon @click="back">mdi-arrow-left-thick</v-icon>
                </v-btn>
                <DisplayFavourites />
            </v-navigation-drawer>

            <!-- Main Page -->
            <v-container class="d-flex flex-column mt-9 mb-10 pb-0 align-center">
                <v-main>
                    <Nuxt />
                </v-main>
                <v-footer absolute app class=" mb-0 justify-center">
                    <span class="ma-0 pa-0">ufood - Project</span>
                    <span class="ma-0 pa-0">&copy; 2023</span>
                </v-footer>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import DisplayHistory from "@/components/pages/profil/DisplayHistory.vue";
import DisplayUserSettings from "@/components/pages/profil/DisplayUserSettings.vue";
import DisplayFavourites from "@/components/pages/favoris/DisplayFavourites.vue";

export default {
    name: 'DefaultLayout',
    data() {
        return {
            leftDrawer: false,
            rightDrawer: false,
            token: this.$cookies.get('token')
        }
    },
    components: {
        DisplayUserSettings,
        DisplayHistory,
        DisplayFavourites
    },
    async mounted() {
        await this.load();
    },
    methods: {
        async load() {
            if (this.$router.currentRoute.name != 'connexion' && !this.$cookies.get('token')) {
                this.$router.push('/connexion');
            }
        },
        back() {
            this.rightDrawer = false
            this.leftDrawer = false
        },
        pushIndex() {
            this.$router.push('/')
        },
        update() {
            this.token = this.$cookies.get('token')
            console.log("update")
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
        }
    }
}
</script>

<style>
.cursor {
    cursor: pointer;
}
</style>
