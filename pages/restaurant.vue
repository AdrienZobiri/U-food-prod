<template>
  <v-col>
    <v-row>
      <PhotosRestaurantComponent :restaurantPictures="restaurantPictures" />
    </v-row>
    <v-row>
      <InfosRestaurantComponent :restaurantName="restaurantName" :restaurantAddress="restaurantAddress"
        :restaurantOpeningHours="restaurantOpeningHours" :restaurantTel="restaurantTel"
        :restaurantRating="restaurantRating" :restaurantPriceRange="restaurantPriceRange"
        :restaurantPlaceId="restaurantPlaceId" :restaurantGenre="restaurantGenre"
        :restaurantLocation="restaurantLocation" />
    </v-row>
    <v-row>
      <AddFavourites :restaurantId="restaurantId"/>
    </v-row>
    <v-row>
      <MapRestaurantComponent :restaurantLocation="restaurantLocation" />
    </v-row>
  </v-col>
</template>

<script>
import AddFavourites from "~/components/pages/favoris/AddFavourites.vue";
import InfosRestaurantComponent from "~/components/pages/details/InfosRestaurantComponent.vue";
import PhotosRestaurantComponent from "~/components/pages/details/PhotosRestaurantComponent.vue";
import MapRestaurantComponent from "../components/pages/details/MapRestaurantComponent.vue";

export default {
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
      restaurantLocation: [],
      restaurantId: this.$route.params.id
    };
  },
  mounted() {
    this.fetchDataFromAPI();
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const params = {
          access_token: this.$cookies.get('token'),
        };
        const response = await this.$axios.get('/restaurants/' + this.restaurantId, { params });

        const responseData = response.data;
        console.log(responseData)

        this.restaurantOpeningHours = responseData.opening_hours;
        this.restaurantPictures = responseData.pictures;
        this.restaurantName = responseData.name;
        this.restaurantPlaceId = responseData.place_id;
        this.restaurantAddress = responseData.address;
        this.restaurantTel = responseData.tel;
        this.restaurantRating = responseData.rating;
        this.restaurantPriceRange = responseData.price_range;
        this.restaurantGenre = responseData.genres;
        this.restaurantLocation = responseData.location;

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

