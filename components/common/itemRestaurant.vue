<template>
  <div>
    <Carousel :items="restaurant.pictures" :id="restaurant.id" />
    <v-row class="d-flex justify-space-between pa-5">
      <v-col class="py-0 d-flex justify-center align-center col-8" style="word-break: break-word">
        <div class="text-subtitle-1">{{ restaurant.name }}</div>
      </v-col>
      <v-col class="py-0 d-flex justify-end align-center col-4" style="word-break: break-word">
        <Visited :visited="restaurant.visited" :modal="modal" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Carousel from '@/components/common/carousel.vue';
import Visited from '@/components/common/visited.vue';
export default {
  name: 'ItemRestaurant',
  components: {
    Carousel,
    Visited
  },
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modal: false
    }
  }
}
</script>
