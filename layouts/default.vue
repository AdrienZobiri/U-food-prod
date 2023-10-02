<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
<template>
    <v-app dark dense flat outlined rounded>
        <div>
            <v-app-bar dark>
                <v-spacer></v-spacer>
                <v-icon @click.stop="leftDrawer = !leftDrawer" v-if="leftDrawerButton">mdi-account</v-icon>
                <v-spacer></v-spacer>
                <div @click="pushIndex" class="text-h3 cursor">U-Food</div>
                <v-spacer></v-spacer>
                <v-icon @click.stop="rightDrawer = !rightDrawer" v-if="rightDrawerButton">mdi-star</v-icon>
                <v-spacer></v-spacer>
            </v-app-bar>
            <!-- Account bar left -->
            <v-navigation-drawer v-model="leftDrawer" absolute left temporary width="500" height="100vh">
                <div class="d-flex justify-end fixed">
                    <v-btn @click="back" class="d-flex justify-end ">
                        <v-icon @click="back">mdi-arrow-right-thick</v-icon>
                    </v-btn>
                </div>
                <DisplayUserSettings @update="update()" @close="leftDrawer = false" />
                <DisplayHistory @update="update()" @close="leftDrawer = false" />
            </v-navigation-drawer>

            <!-- Favorite bar right -->
            <v-navigation-drawer v-if="rightDrawer" v-model="rightDrawer" absolute right temporary width="500"
                height="100vh">
                <v-btn @click="back" v-if="rightDrawer">
                    <v-icon @click="back">mdi-arrow-left-thick</v-icon>
                </v-btn>
                <DisplayFavorites />
            </v-navigation-drawer>

            <!-- Main Page -->
            <v-container class="d-flex flex-column mt-9 mb-10 pb-0 align-center">
                <Nuxt class="mainClas" />
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
import DisplayFavorites from "@/components/pages/favoris/DisplayFavorites.vue";

export default {
    name: 'DefaultLayout',
    data() {
        return {
            leftDrawerButton: true,
            rightDrawerButton: true,
            leftDrawer: false,
            rightDrawer: false,
            loged: false,
        }
    },
    components: {
        DisplayUserSettings,
        DisplayHistory,
        DisplayFavorites
    },
    watch: {
        $route() {
            if (this.$router.currentRoute.name !== 'connexion') {
                this.rightDrawerButton = true
                this.leftDrawerButton = true
            } else {
                this.rightDrawerButton = false
                this.leftDrawerButton = false
            }
        }
    },
    async mounted() {
        await this.load();
    },
    methods: {
        async load() {
            if (this.$router.currentRoute.name !== 'connexion' && !this.$cookies.get('token')) {
                await this.$router.push('/connexion');
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
        },
    }
}
</script>

<style>
.mainClass {
    width: 90vw;
}

.cursor {
    cursor: pointer;
}
</style>
