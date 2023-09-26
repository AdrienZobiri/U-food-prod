<template>
    <div>
        <div class="boxSearch">
            <div class="shearchBar">
                <v-icon class="ma-1">mdi-magnify</v-icon>
                <input class="inputSearch" type="text" placeholder="Search" id="input" v-on:input="editList()"/>
            </div>
            <div>
                <div class="text-subtitle-2 filter" @click="displayFiler = !displayFiler">Filter</div>
                <div v-if="selected.length > 0 || selectedGender.length > 0" class="text-subtitle-2 filter mt-5" @click="selected = [], selectedGender = [], editList()">Reset</div>
            </div>
        </div>
        <div v-if="displayFiler" class="filterBox">
            <div class="priceBox">
                <div class="text-subtitle-1 textPrice">Selected Price:</div>
                <div>
                    <v-container fluid>
                        <v-checkbox label="1" value="1" v-model="selected" @change="editList()"></v-checkbox>
                        <v-checkbox label="2" value="2" v-model="selected" @change="editList()"></v-checkbox>
                        <v-checkbox label="3" value="3" v-model="selected" @change="editList()"></v-checkbox>
                    </v-container>
                </div>
            </div>
            <div class="genderBox">
                <div class="text-subtitle-1 textPrice">Selected Price:</div>
                <v-container fluid>
                    <v-checkbox label="desserts" value="desserts" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="bistro" value="bistro" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="ambiance" value="ambiance" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="fast-food" value="fast-food" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="fruits de mer" value="fruits de mer" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="hamburgers" value="hamburgers" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="végétarien" value="végétarien" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="santé" value="santé" v-model="selectedGender" @change="editList()"></v-checkbox>
                    <v-checkbox label="mexicain" value="mexicain" v-model="selectedGender" @change="editList()"></v-checkbox>
                </v-container>
            </div>
        </div>
        <div class="contentRestaurant">
            <div v-for="item in restaurantsFilter" class="boxContent">
                <itemRestaurant :restaurant="item"/>
            </div>
        </div>
    </div>
</template>

<script>
import itemRestaurant from '~/components/common/itemRestaurant.vue';
export default {
    name: 'ListRestaurant',
    components: {
        itemRestaurant
    },
    data() {
        return {
            restaurant: {},
            restaurants: {},
            restaurantsFilter: {},
            displayFiler: false,
            selected: [],
            selectedGender: []
        }
    },
    async mounted() {
        await this.getRestaurants();
        await this.getVisitedRestaurants();
    },
    methods: {
        async getVisitedRestaurants() {
            try {
                const id = this.$cookies.get('id');
                const params = {
                    access_token: this.$cookies.get('token'),
                };

                const response = await this.$axios.get('/users/' + id + '/restaurants/visits', { params })
                console.log(response.data.items)
                for (let y = 0; y < this.restaurants.length; y++) {
                    this.restaurants[y].visited = false
                    for (let i = 0; i < response.data.items.length; i++) {
                        if (response.data.items[i].restaurant_id == this.restaurants[y].id) {
                            this.restaurants[y].visited = true
                        }
                    }
                }
                this.restaurantsFilter = JSON.parse(JSON.stringify(this.restaurants));
            } catch (error) {
                console.log(error);
            }
        },
        async getRestaurants() {
            // return list of restaurants with props for carousel
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                const response = await this.$axios.get('/restaurants', { params });
                this.restaurants = response.data.items;
            } catch (error) {
                console.log(error);
            }
        },
        priceFilter() {
            for (let i = 0; i < this.restaurantsFilter.length; i++) {
                for (let j = 0; j < this.selected.length; j++) {
                    if (this.restaurantsFilter[i].price_range == this.selected[j]) {
                        this.restaurantsFilter[i].priceValid = true
                    }
                }
            }
            for (let i = 0; i < this.restaurantsFilter.length; i++) {
                if (!this.restaurantsFilter[i].priceValid) {
                    this.restaurantsFilter.splice(i, 1)
                    i--
                }
            }
            console.log(this.restaurantsFilter)
        },
        shearchFilter(value) {
            for (let i = 0; i < this.restaurantsFilter.length; i++) {
                this.restaurantsFilter[i].name = this.restaurantsFilter[i].name.toLowerCase()

                if (this.restaurantsFilter[i].name.indexOf(value) == -1) {
                    this.restaurantsFilter.splice(i, 1)
                    i--
                }
            }
        },
        genderFilter() {
            for (let i = 0; i < this.restaurantsFilter.length; i++) {
                for (let y = 0; y < this.restaurantsFilter[i].genres.length; y++) {
                    console.log(this.restaurantsFilter[i].genres[y])
                    if (this.selectedGender.includes(this.restaurantsFilter[i].genres[y])) {
                        this.restaurantsFilter[i].validGender = true
                    }
                }
            }
            for (let i = 0; i < this.restaurantsFilter.length; i++) {
                if (!this.restaurantsFilter[i].validGender) {
                    this.restaurantsFilter.splice(i, 1)
                    i--
                }
            }

        },
        editList() {
            //filter restaurants array by name with search value
            this.restaurantsFilter = JSON.parse(JSON.stringify(this.restaurants));
            let value = document.getElementById("input").value.toLowerCase()

            if (this.selectedGender.length > 0 && value && this.selected.length > 0) {
                this.genderFilter()
                this.priceFilter()
                this.shearchFilter(value)
                return;
            }

            if (this.selectedGender.length == 0 && value && this.selected.length > 0) {
                this.priceFilter()
                this.shearchFilter(value)
                return;
            }

            if (this.selectedGender.length > 0 && (value == null || value == "") && this.selected.length > 0) {
                this.genderFilter()
                this.priceFilter()
                return;
            }

            if (this.selectedGender.length > 0 && value && (this.selected.length == 0 || this.selected == null)) {
                this.genderFilter()
                this.shearchFilter(value)
                return;
            }

            if (this.selectedGender.length > 0) {
                this.genderFilter()
                return;
            }

            if (this.selected.length > 0) {
                this.priceFilter()
                return;
            }
            if (value) {
                this.shearchFilter(value)
                return;
            }
        },
    },
}
</script>

<style scoped>
.shearchBar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #ffffff;
    height: 35px;
    color: #ffffff;
    border-radius: 10px;
    width: 90%;
}
.inputSearch {
    color: #ffffff;
    border: none;
    width: 100%;
    border-left: #ffffff 1px solid;
    padding-left: 10px;
    height: 35px;
}
.inputSearch:focus {
    outline: none;
}
.filter {
    color: #ffffff;
    border: #ffffff 1px solid;
    border-radius: 10px;
    font-size: 15px;
    height: 35px;
    display: flex;
    align-items: center;
    padding: 1vw;
}
.filter:hover {
    cursor: pointer;
    background-color: #ffffff;
    color: #000000;
}
.boxSearch {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.contentRestaurant {
    display: grid;
    grid-template-columns: repeat(2, 40%);
    align-items: center;
    grid-column-gap: 10vw;
    justify-content: center;
}
.boxContent {
    display: flex;
    flex-direction: column;
    border: solid 1px #ffffff;
    margin-top: 30px;
    border-radius: 25px;
    cursor: pointer;
}

.filterBox {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px auto;
    border: 1px solid #ffffff;
    height: auto;
    width: auto;
    color: #ffffff;
    border-radius: 10px;
    padding: 15px;
}

.priceBox, .genderBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
}

.textPrice:hover {
    cursor: pointer;
    text-decoration: underline;
}

@media screen and (max-width: 1024px) {
    .contentRestaurant {
        grid-template-columns: repeat(1, 100%);
        grid-column-gap: 0;
    }
}
</style>
