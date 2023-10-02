<template>
  <l-map style="height: 300px" :zoom="zoom" :center="center" class="map">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
  </l-map>
</template>

<script>
export default {
  data() {
    return {
      restaurantId: this.$cookies.get('restaurantId'),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      long: 0,
      lat: 0,
      center: [0, 0],
      markerLatLng: [0, 0]
    };
  },
  async mounted() {
    try {
      const headers = {
        authorization: this.$cookies.get('token'),
      };
      const response = await this.$axios.get('/restaurants/' + this.restaurantId, { headers: headers });
      this.lat = parseFloat(response.data.location.coordinates[0]);
      this.long = parseFloat(response.data.location.coordinates[1]);
      this.center = [this.long, this.lat]
      this.markerLatLng = [this.long, this.lat]
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }
};
</script>

<style scoped>
.map {
  z-index: 1;
}
</style>
