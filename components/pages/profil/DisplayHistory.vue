<template>
    <div>
        <v-card class="d-flex flex-column align-center pa-3 mt-5" v-if="displayRestaurant"
            v-for="(restaurant, n) in listRestaurants" :key="n">
            <v-img :src="restaurant.image" alt="image-profil" width="20vw" />
            <v-card-title class="text-center">{{ restaurant.name }}</v-card-title>
            <v-card-text class="text-center">Number of visits: {{ restaurant.nbVisit }}</v-card-text>
        </v-card>
        <v-card class="d-flex flex-column align-center pa-3 mt-5" v-if="!displayRestaurant">
            <v-card-title class="text-center">HISTORY</v-card-title>
            <v-card-text class="text-center">You don't have visited any restaurants</v-card-text>
            <v-btn click="backToHome">Back to home</v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'DisplayHistory',
    methods: {
        checkArray() {
            if (this.listRestaurants.length !== 0) {
                this.displayRestaurant = true
            }
        },
        backToHome() {
            this.$emit("close")
        },
        async getHistory() {
            this.restaurants = await this.$axios.get('/')
        }

    },
    mounted() {
        this.checkArray()
    },
    data() {
        return {
            displayRestaurant: false,
            listRestaurants: []
        }
    },
    mounted() {
        this.getHistory()
    },
    methods:{
        async getHistory() {
            const id = this.$cookies.get('id')
            const params = {
                access_token: this.$cookies.get('token')
            }
            const response = await this.$axios.get('/users/'+ id +'/restaurants/visits/', { params })
            console.log('HISTO', response.data)
            this.listRestaurants = response.data
        }
    }

}
</script>
