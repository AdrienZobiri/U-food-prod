<template>
  <div class="boxContentCarousel" @click="goToRestaurant(id)">
    <v-carousel :show-arrows="false" :cycle="true" class="carousel" hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item"></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    items: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    async goToRestaurant(id) {
      await this.$cookies.set('restaurantId', id)
      this.$router.push({ name: 'restaurant', params: { id: id } })
    }
  }
}
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 300px !important;
  border-radius: 25px 25px 0 0;
}

.boxContentCarousel {
  width: 100%;
  height: auto;
}
</style>
