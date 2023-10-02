<template>
    <v-dialog v-model="dialog" persistent max-width="450">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" rounded class="ma-2 pa-6">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </template>
        <v-card class="pa-6">
            <v-card-title class="justify-center text-h5">
                FAVORITES
            </v-card-title>
            <v-card-text>
                <!-- Create new list -->
                <v-switch v-model="regis" :label="`New list ?`" />
                <v-text-field v-if="regis" v-model="newListName" label="Name of the list"
                    :rules="[v => !!v || 'Name required', v => /^[a-zA-Z0-9]+$/.test(v) || 'Name invalid']" :counter="50"
                    :maxlength="50" required></v-text-field>
                <v-btn v-if="regis" :disabled="!newListName" color="green darken-1" text @click="createNewList()">
                    Create
                </v-btn>
                <v-switch v-model="showAll" :label="`Display all lists`" @click="getLists()" />
                <!-- list all lists -->

                <v-list>
                    <div class="text-subtitle-1">List FAVORITES</div>
                    <v-list-group v-for="item in listsfavorits" :key="item.id" v-model="item.active"
                        :prepend-icon="item.action" no-action>
                        <template v-slot:activator>
                            <v-list-item-content @click="listActive = item.id">
                                <div class="d-flex">
                                    <v-btn @click="deleteList(item.id)" small icon>
                                        <v-icon>mdi-playlist-remove</v-icon>
                                    </v-btn>
                                    <div class="text-subtitle-1" v-text="truncateItemName(item.name, 50)"></div>
                                </div>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="child in item.restaurants" :key="child.id">
                            <v-list-item-content>
                                <div class="d-flex">
                                    <v-btn @click="deleteResto(item.id, child.id)" small icon>
                                        <v-icon>mdi-tag-remove</v-icon>
                                    </v-btn>
                                    <div class="text-subtitle-1" v-text="child.name"></div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
                <!-- button action -->
                <v-container fluid>
                    <v-row class="justify-center pa-2">
                        <v-col class="d-flex justify-center">
                            <v-btn rounded @click="pagePrev()">
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="pageList" @keyup.enter="getLists()" type="number"></v-text-field>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <v-btn rounded @click="pageNext()">
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <!-- <v-btn color="red darken-1" text @click="deleteAllLists()">
                    <div class="text-subtitle-1">DELETTE ALL</div>
                </v-btn> -->
            </v-card-text>
            <!-- close dialog -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false, addResto(listActive)">
                    <!-- maybe error when no select -->
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DisplayFavorites',
    props: {
        restaurantId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            editMode: false,
            listActive: '', // unused for the moment but need to keep
            dialog: false,
            listsfavorits: [],
            newListName: '',
            regis: false,
            pageList: 0,
            showAll: false,
        }
    },
    async mounted() {
        await this.getLists();
    },
    methods: {
        ////////////////////////////

        // get page lists of favorites
        async getLists() {
            if (this.showAll) {
                await this.getPageLists(this.pageList);
            } else {
                await this.getFavLists(this.pageList);
            }
            for (let i = 0; i < this.listsfavorits.length; i++)
                if (this.listsfavorits[i].restaurants.length > 0) {
                    for (let j = 0; j < this.listsfavorits[i].restaurants.length; j++) {
                        await this.getResto(this.listsfavorits[i].restaurants[j].id)
                    }
                }
        },
        // get page lists of all favorites
        async getPageLists(page) {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                };
                const response = await this.$axios.get(`/favorites?page=${page}`, { headers: headers });
                this.listsfavorits = response.data.items;
            } catch (error) {
                console.log(error);
            }
        },
        // get page lists of my favorites
        async getFavLists(page) {
            try {
                const id = this.$cookies.get('id');
                const headers = {
                    authorization: this.$cookies.get('token'),
                };
                const response = await this.$axios.get(`/users/${id}/favorites?page=${page}`, { headers: headers });
                this.listsfavorits = response.data.items;
            } catch (error) {
                console.log(error);
            }
        },
        // get and set restaurant name
        async getResto(resto_id) {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                };
                const response = await this.$axios.get(`/restaurants/${resto_id}`, { headers: headers });
                for (let i = 0; i < this.listsfavorits.length; i++)
                    if (this.listsfavorits[i].restaurants.length > 0) {
                        for (let j = 0; j < this.listsfavorits[i].restaurants.length; j++) {
                            if (this.listsfavorits[i].restaurants[j].id === resto_id)
                                this.listsfavorits[i].restaurants[j].name = response.data.name;
                        }
                    }
            } catch (error) {
                console.log(error);
            }
        },
        ////////////////////////////

        // create a new list of favorite and add this restaurant to this list
        async createNewList() {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                }
                const data = {
                    'name': `${this.newListName}`,
                }
                const response = await this.$axios.post(`/favorites`, data, { headers: headers });
                this.listsfavorits.push(response.data);
                this.newListName = '';
                this.regis = false;
            } catch (error) {
                console.log(error);
            }
        },
        // add restaurant to list of favorites
        async addResto(idlist) {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                }
                const data = {
                    'id': `${this.restaurantId}`
                }
                const response = await this.$axios.post(`/favorites/${idlist}/restaurants`, data, { headers: headers });
                await this.getLists()
            } catch (error) {
                console.log(error);
            }
        },
        ////////////////////////////

        // delete list of favorites
        async deleteList(id) {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                };
                const response = await this.$axios.delete('/favorites/' + id, { headers: headers });
                await this.getLists();
            } catch (error) {
                console.log(error);
            }
        },
        // delete restaurant of list of favorites
        async deleteResto(idlist, idresto) {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                };
                const response = await this.$axios.delete(`/favorites/${idlist}/restaurants/${idresto}`, { headers: headers });
                await this.getLists();
            } catch (error) {
                console.log(error);
            }
        },
        ////////////////////////////

        // Navigation page
        async pagePrev() {
            this.pageList = this.pageList > 0 ? this.pageList - 1 : 0;
            await this.getLists();
        },
        async pageNext() {
            this.pageList = parseInt(this.pageList, 10);
            this.pageList = this.pageList >= 0 ? this.pageList + 1 : 0;
            await this.getLists();
        },
        truncateItemName(name, maxLength) {
            try {
                if (name && name.length > maxLength) {
                    return name.slice(0, maxLength) + '...';
                }
                return name;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
