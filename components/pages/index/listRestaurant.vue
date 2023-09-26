<template>
    <div>
        <div class="boxSearch">
            <div class="shearchBar">
                <v-icon class="ma-1">mdi-magnify</v-icon>
                <input class="inputSearch" type="text" placeholder="Search" id="input" v-on:input="editList()"/>
            </div>
            <div class="text-subtitle-2 filter" @click="displayFiler = !displayFiler">Filter</div>
        </div>
        <div v-if="displayFiler" class="filterBox">
            <div class="priceBox">
                <h4>decreasing price</h4>
                <h4>ascending price</h4>
            </div>
            <div class="genderBox"></div>
        </div>
        <div class="contentRestaurant">
            <div v-for="item in restaurantsFilter" class="boxContent" @click="goToRestaurant(item.id)">
                <Carousel :items="item.pictures"/>
                <div class="contentInfo">
                    <h2>{{item.name}}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Carousel from '@/components/common/carousel.vue';
export default {
    name: 'ListRestaurant',
    components: {
        Carousel
    },
    data() {
        return {
            restaurants: {},
            restaurantsFilter: {},
            displayFiler: false,
            min: 300,
            max: 700
        }
    },
    async mounted() {
        await this.getRestaurants();
    },
    methods: {
        async getRestaurants() {
            // return list of restaurants with props for carousel
            try {
                const params = {
                    access_token: this.$cookies.get('token'),
                };
                const response = await this.$axios.get('/restaurants', { params });
                this.restaurants = response.data.items;
                this.restaurantsFilter = JSON.parse(JSON.stringify(response.data.items));
            } catch (error) {
                console.log(error);
            }
        },
        editList() {
            //filter restaurants array by name with search value
            this.restaurantsFilter = JSON.parse(JSON.stringify(this.restaurants));
            let value = document.getElementById("input").value.toLowerCase()

            if (value == null || value == "") {
                return;
            }
            for (let i = 0; i < this.restaurantsFilter.length; i++) {
                this.restaurantsFilter[i].name = this.restaurantsFilter[i].name.toLowerCase()

                if (this.restaurantsFilter[i].name.indexOf(value) == -1) {
                    this.restaurantsFilter.splice(i, 1)
                    i--
                }
            }
        },
        goToRestaurant(id) {
            this.$router.push({ name: 'restaurant', params: { id: id } })
        }
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
.contentInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vw;
}

.filterBox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    border: 1px solid #ffffff;
    height: 35px;
    color: #ffffff;
    border-radius: 10px;
    width: 50%;
    padding: 15px;
}

.priceBox, .genderBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
}

@media screen and (max-width: 1024px) {
    .contentRestaurant {
        grid-template-columns: repeat(1, 100%);
        grid-column-gap: 0;
    }
}
</style>
