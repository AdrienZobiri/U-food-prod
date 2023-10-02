<template>
    <v-col>
        <v-row>
            <PhotosRestaurantComponent :restaurantPictures="restaurantPictures" />
        </v-row>
        <v-row class="justify-center">
            <InfosRestaurantComponent :restaurantName="restaurantName" :restaurantAddress="restaurantAddress"
                                      :restaurantOpeningHours="restaurantOpeningHours" :restaurantTel="restaurantTel"
                                      :restaurantRating="restaurantRating" :restaurantPriceRange="restaurantPriceRange"
                                      :restaurantPlaceId="restaurantPlaceId" :restaurantGenre="restaurantGenre"
                                      :restaurantLocationLong="restaurantLocationLong"
                                      :restaurantLocationLat="restaurantLocationLat" />
        </v-row>
        <v-row class="justify-center">
            <AddFavourites :restaurantId="restaurantId"/>
        </v-row>
        <v-row class="py-9">
            <MapRestaurantComponent/>
        </v-row>
    </v-col>
</template>

<script>
import AddFavourites from "~/components/pages/favoris/AddFavourites.vue";
import InfosRestaurantComponent from "~/components/pages/details/InfosRestaurantComponent.vue";
import PhotosRestaurantComponent from "~/components/pages/details/PhotosRestaurantComponent.vue";
import MapRestaurantComponent from "../components/pages/details/MapRestaurantComponent.vue";
export default {
    name: 'Restaurant',
    data() {
        return {
            restaurantName: '',
            restaurantAddress: '',
            restaurantOpeningHours: [],
            restaurantPictures: [],
            restaurantTel: '',
            restaurantRating: '',
            restaurantPriceRange: '',
            restaurantPlaceId: '',
            restaurantGenre: [],
            restaurantLocationLat: '',
            restaurantLocationLong: '',
            restaurantLocationUrl: '',
            restaurantId: this.$cookies.get('restaurantId'),
        }
    },
    async mounted() {
        await this.cookiesManager();
        await this.fetchDataFromAPI();
    },
    methods: {
        async cookiesManager() {
            if (this.restaurantId === null || this.restaurantId === undefined) {
                this.$router.push('/');
            }
        },
        async fetchDataFromAPI() {
            try {
                const headers = {
                    authorization: this.$cookies.get('token'),
                };
                const response = await this.$axios.get('/restaurants/' + this.restaurantId, { headers: headers });
                this.restaurantOpeningHours = response.data.opening_hours;
                this.restaurantPictures = response.data.pictures;
                this.restaurantName = response.data.name;
                this.restaurantPlaceId = response.data.place_id;
                this.restaurantAddress = response.data.address;
                this.restaurantTel = response.data.tel;
                this.restaurantRating = response.data.rating;
                this.restaurantPriceRange = response.data.price_range;
                this.restaurantGenre = response.data.genres;
                this.restaurantLocationLat = response.data.location.coordinates[0];
                this.restaurantLocationLong = response.data.location.coordinates[1];
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        },
    },
    components: {
        InfosRestaurantComponent,
        PhotosRestaurantComponent,
        MapRestaurantComponent,
        AddFavourites
    },
};

</script>

