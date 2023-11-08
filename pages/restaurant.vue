<template>
  <v-col>
    <v-row>
      <PhotosRestaurantComponent :restaurant="restaurant" v-if="isLoad"/>
    </v-row>
    <v-row class="justify-center">
      <InfosRestaurantComponent :restaurant="restaurant" v-if="isLoad"/>
    </v-row>
    <v-row class="py-0">
      <MapRestaurantComponent :restaurant="restaurant" v-if="isLoad"/>
    </v-row>
  </v-col>
</template>

<script>
import InfosRestaurantComponent from "~/components/pages/details/InfosRestaurantComponent.vue";
import PhotosRestaurantComponent from "~/components/pages/details/PhotosRestaurantComponent.vue";
import MapRestaurantComponent from "~/components/pages/details/MapRestaurantComponent.vue";
export default {
  name: 'Restaurant',
  data() {
    return {
      isLoad: false,
      restaurant: {},
    };
  },
  async mounted() {
    await this.fetchDataFromAPI();
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const id = this.$cookies.get('restaurantId');
        const userid = this.$cookies.get('id');
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.get(`/restaurants/${id}`, { headers: headers });
        this.restaurant = response.data;
        this.restaurant.rating = Math.round(this.restaurant.rating);
        this.restaurant.location.lat = parseFloat(response.data.location.coordinates[0]);
        this.restaurant.location.lng = parseFloat(response.data.location.coordinates[1]);
        this.restaurant.visited = false
        const visits = await this.$axios.get(`/users/${userid}/restaurants/visits`, { headers: headers });
        for (let i = 0; i < visits.data.items.length; i++)
          if (visits.data.items[i].restaurant_id === this.restaurant.id) {
            this.restaurant.visited = true
            break;
          }
        console.log('restaurant', this.restaurant);
        this.isLoad=true;
      } catch (error) {
        if (error.response.status === 401)
          this.$cookies.set('token', null)
        else
          console.error(error);
      }
    },
  },
  components: {
    InfosRestaurantComponent,
    PhotosRestaurantComponent,
    MapRestaurantComponent,
  }
};

</script>

