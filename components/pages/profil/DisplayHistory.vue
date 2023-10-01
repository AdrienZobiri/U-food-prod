<template>
    <div class="overflow-auto scroll">
        <v-card class="d-flex flex-column align-center pa-3 mt-5" v-if="displayRestaurant"
            v-for="(restaurant, n) in listRestaurants" :key="n">
            <v-img :src="restaurant.image" alt="image-profil" width="20vw" />
            <v-card-title class="text-center">{{ restaurant.name }}</v-card-title>
            <v-card-text class="text-center">Number of visits: {{ restaurant.nbVisit }}</v-card-text>
        </v-card>
        <v-card class="d-flex flex-column align-center pa-3 mt-5" v-if="!displayRestaurant">
            <v-card-title class="text-center">HISTORY</v-card-title>
            <v-card-text class="text-center">You don't have visited any restaurants</v-card-text>
            <v-btn v-on:click="backToHome">Back to home</v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'DisplayHistory',
    data() {
        return {
            displayRestaurant: false,
            restaurants: [],
            listRestaurants: [],
        }
    },
    async mounted() {
        await this.getHistory()
        this.checkArray()
    },
    methods:{
        async getHistory() {
            if (!this.$cookies.get('token')) {
                this.displayRestaurant = false
                return
            }
            const id = this.$cookies.get('id')
            const params = {
                access_token: this.$cookies.get('token')
            }
            const response = await this.$axios.get('/users/'+ id +'/restaurants/visits/', { params })
            console.log(response.data.items);

            this.listRestaurants = response.data.items
            await this.getRestaurants()
            const count = this.listRestaurants.reduce((acc, restaurantVisite) => {
                const id = restaurantVisite.restaurant_id;
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});
            console.log(count);
            this.addName()
            // delete duplicate in listRestaurants
            this.listRestaurants = this.listRestaurants.filter((restaurantVisite, index, self) =>
                index === self.findIndex((t) => (
                    t.restaurant_id === restaurantVisite.restaurant_id
                ))
            )
            // add nbVisit in listRestaurants
            for (let i = 0; i < this.listRestaurants.length; i++) {
                const restaurantVisite = this.listRestaurants[i];
                restaurantVisite.nbVisit = count[restaurantVisite.restaurant_id]
            }
            console.log(this.listRestaurants);

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
        addName() {
            for (let i = 0; i < this.listRestaurants.length; i++) {
                const restaurantVisite = this.listRestaurants[i];
                for (let j = 0; j < this.restaurants.length; j++) {
                    const restaurant = this.restaurants[j];
                    if (restaurantVisite.restaurant_id === restaurant.id) {
                        restaurantVisite.name = restaurant.name;
                        break;
                    }
                }
            }
        },
        checkArray() {
            if (this.listRestaurants.length !== 0) {
                this.displayRestaurant = true
            }
        },
        backToHome() {
            this.$emit("close")
            this.$router.push('/')
        }
    }

}
</script>


<style>
.scroll {
    height: auto;
}
</style>