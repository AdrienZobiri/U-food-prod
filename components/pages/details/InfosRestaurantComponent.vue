<template>
  <v-container class="d-flex flex-column" height="100%">
    <v-card>
      <v-card-title class="text-h3 justify-center" style="word-break: break-word">
        {{ restaurant.name }}
      </v-card-title>
      <v-row class="d-flex justify-center">
        <v-col class="py-0 d-flex justify-end align-center" style="word-break: break-word">
          <AddFavourites />
        </v-col>
        <v-col class="py-0 d-flex justify-start align-center" style="word-break: break-word">
          <Visited :modal="modal" :visited="restaurant.visited" />
        </v-col>
      </v-row>
      <v-card-text class="d-flex flex-row flex-wrap text-h5 pa-0 justify-center">
        Servicies
        <div v-for="(genre, index) in restaurant.genre" :key="index" class="text-h5 pa-0">
          , {{ genre }}
        </div>
      </v-card-text>
      <v-card-text class="text-h5 d-flex justify-center">
        <v-btn :href="'tel:' + restaurant.tel">
          <v-icon>
            mdi-phone
          </v-icon>
          +1
          {{ restaurant.tel }}
        </v-btn>
      </v-card-text>
      <v-card-text class="text-h5 d-flex pa-0 justify-center">
        User appreciation :
      </v-card-text>
      <v-card-text class="d-flex flex-row pa-0 justify-center">
        <v-list v-for="index in restaurant.rating" :key="index">
          <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                mdi-star
              </v-icon>
            </template>
            <span> Appretiation client {{ restaurant.rating }} / 5 </span>
          </v-tooltip>
        </v-list>
      </v-card-text>
      <v-card-text class="d-flex flex-row pa-0 justify-center">
        <v-list v-for="i in restaurant.price_range" :key="i">
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                mdi-currency-usd
              </v-icon>
            </template>
            <span> Almighty dollar {{ restaurant.price_range }} / 3 </span>
          </v-tooltip>
        </v-list>
      </v-card-text>
      <v-card-text class="text-h5 d-flex pa-0 justify-center">
        Usual opening hours :
      </v-card-text>
      <!-- xs="1" sm="3" md="3" xl="3" -->
      <!-- xs="1" sm="4" md="6" xl="8" -->
      <v-card-text v-for="(open, index) in restaurant.opening_hours" :key="index" class="text-h5 my-0 justify-center">
        <v-row class="justify-center">
          <v-col class="py-0 d-flex justify-end" style="word-break: break-word">
            {{ index }}
          </v-col>
          <v-col class="py-0">
            {{ open }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="d-flex justify-center">
        {{ restaurant.adress }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AddFavourites from "~/components/pages/favoris/AddFavourites.vue";
import Visited from "~/components/common/visited.vue";
export default {
  name: "InfosRestaurantComponent",
  data() {
    return {
      modal: false,
    };
  },
  components: {
    AddFavourites,
    Visited
  },
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  }
}
</script>
