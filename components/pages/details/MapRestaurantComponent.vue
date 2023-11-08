<template>
  <v-container class="d-flex flex-column justify-center pt-0">
    <div class="d-inline-flex justify-center pb-2">
      <v-btn rounded color="primary" @click="openGoogleMapsDirections">
        <v-icon>mdi-walk</v-icon>
        Partir maintenant
        <v-icon>mdi-directions</v-icon>
      </v-btn>
    </div>
    <div class="map-container justify-center">
      <div>
        <GmapMap :center="markerPosition" :zoom="14" style="width: 100%; height: 600px" class="mb-5">
          <GmapMarker :position="markerPosition"></GmapMarker>
        </GmapMap>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MapRestaurantComponent',
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      markerPosition: {
        lat: -70,
        lng: 0,
      },
    };
  },
  async mounted() {
    try {
      this.markerPosition.lat = parseFloat(this.restaurant.location.coordinates[1]);
      this.markerPosition.lng = parseFloat(this.restaurant.location.coordinates[0]);
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo(this.markerPosition);
      });
    } catch (error) {
      console.error('Error map loading :', error);
    }
  },
  methods: {
    openGoogleMapsDirections() {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.markerPosition.lat},${this.markerPosition.lng}`;
      window.open(directionsUrl, '_blank');
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
  z-index: 1;
}
</style>
