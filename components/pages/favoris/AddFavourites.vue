<template>
    <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <!-- If not already in favourites -->
                <v-icon v-if="!already">mdi-star-outline</v-icon>
                <!-- If is already in favourites -->
                <v-icon v-if="already">mdi-star</v-icon>
            </v-btn>
        </template>
        <v-card class="pa-6">
            <v-card-title class="text-h5">
                Add to favourites
            </v-card-title>
            <v-card-text>
                <!-- Create new list -->
                <v-text-field v-if="regis" v-model="newListName" label="Name of the list"
                    :rules="[v => !!v || 'Name required', v => /^[a-zA-Z0-9]+$/.test(v) || 'Name invalid']" :counter="50"
                    :maxlength="50" required></v-text-field>
                <v-switch v-model="regis" :label="`New list ?`" />
                <v-btn v-if="regis" color="green darken-1" text @click="createNewList()">
                    Create
                </v-btn>
                <!-- list all lists -->

                <v-list>
                    <div class="text-subtitle-1">List Favorits</div>
                    <v-list-group v-for="item in listsFavorits" :key="item.id" v-model="item.active"
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
                                <v-list-item-title v-text="child.id"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
                <div class="d-flex justify-space-around">
                    <v-btn rounded @click="pagePrev()">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <!-- <span>{{ this.pageList }}</span> -->
                    <v-text-field v-model="pageList" @keyup.enter="getPageLists()" :label="pageList.toString()"
                        type="number" class="px-8"></v-text-field>
                    <v-btn rounded @click="pageNext()">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
                <v-btn color="red darken-1" text @click="deleteAllLists()">
                    <div class="text-subtitle-1">DELETTE ALL</div>
                </v-btn>
            </v-card-text>
            <!-- close dialog -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false, addResto(listActive)">
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import qs from 'querystring';
export default {
    name: 'AddFavourites',
    data() {
        return {
            listActive: '',
            dialog: false,
            listsFavorits: [],
            already: false,
            newListName: '',
            regis: false,
            userId: this.$cookies.get('id'),
            pageList: 0
        }
    },
    props: {
        restaurantId: {
            type: String,
            required: true,
        }
    },
    async mounted() {
        // await this.checkFavorites();
        await this.getPageLists();
        // await this.getList('607b3d9f1fa5370004c24447');
    },
    methods: {
        async checkFavorites() {
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                const response = await this.$axios.get('/favorites', { params });
                console.log('RESP', response.data);
                for (let i = 0; response.data.items.length; i++) {
                    if (response.data.items[i].id == this.restaurantId) {
                        this.already = true;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        // create a new list of favorite and add this restaurant to this list
        async createNewList() {
            const params = {
                access_token: this.$cookies.get('token'),
                name: this.newListName,
            };
            const response = await this.$axios.post('/favorites', params);
            console.log(response.data);
        },
        // get all lists of favorites
        async getPageLists() {
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                console.log('PAGE IN', this.pageList);
                const response = await this.$axios.get('/favorites?page=' + this.pageList, { params });
                console.log('LIST ALL', response.data.items);
                this.listsFavorits = response.data.items;
            } catch (error) {
                console.log(error);
            }
        },
        // add restaurant to list of favorites
        async addResto(idlist) {
            try {
                const headers = {
                    Authorization: this.$cookies.get('token'),
                };
                const data = {
                    'id': this.restaurantId
                };
                // console.log('DATA', data, this.restaurantId);
                const response = await this.$axios.post(`/favorites/${idlist}/restaurants`, data, { headers: headers });
                // console.log('ADD RESTO', response.data);
                // for (let i = 0; response.data.items.length; i++) {
                //     if (response.data.items[i].id == this.restaurantId) {
                //         this.already = true;
                //     }
                // }
            } catch (error) {
                console.log(error);
            }
        },
        // get data of restaurant NOT USE
        async getResto(resto_id) {
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                const response = await this.$axios.get('/restaurants/' + resto_id, { params });
                console.log('RESTO', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        // get data list of favorites : USLESS
        async getList(ListId) {
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                const response = await this.$axios.get('/favorites/' + ListId, { params });
                console.log('LIST id', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        // delete list of favorites
        async deleteList(id) {
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                const response = await this.$axios.delete('/favorites/' + id, { params });
                console.log('LIST id', response.data);
                await this.getPageLists();
            } catch (error) {
                console.log(error);
            }
        },
        // delete all lists of favorites
        async deleteAllLists() {
            let id = '';
            try {
                for (let i = 0; i < this.listsFavorits.length; i++) {
                    id = this.listsFavorits[i].id;
                    await this.deleteList(id);
                }
                await this.getPageLists();
            } catch (error) {
                console.log(error);
            }
        },
        // Navigation page
        async pagePrev() {
            this.pageList = this.pageList > 0 ? this.pageList - 1 : 0;
            await this.getPageLists();
        },
        async pageNext() {
            this.pageList = this.pageList >= 0 ? this.pageList + 1 : 0;
            console.log('PAGE', this.pageList);
            await this.getPageLists();
            console.log('LIST', this.listsFavorits);
        },
        truncateItemName(name, maxLength) {
            if (name.length > maxLength) {
                return name.slice(0, maxLength) + '...';
            }
            return name;
        }
    }
}
</script>
