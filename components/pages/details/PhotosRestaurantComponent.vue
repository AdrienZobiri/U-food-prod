<template>
  <v-carousel class="d-block my-13" height="600" :cycle="true" :show-arrows="false" :interval="5000" hide-delimiters>
    <v-carousel-item v-for="(picture, index) in restaurant.pictures" :key="index">
      <v-img :src="picture" class="carousel-image" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
