<template>
  <div>
    <div class="boxSearch">
      <div class="shearchBar">
        <v-icon class="ma-1">mdi-magnify</v-icon>
        <input class="inputSearch" type="text" placeholder="Search" id="input" v-on:input="editList()" />
      </div>
      <div>
        <v-btn color="primary" dark v-on:click="showFilter = !showFilter" rounded class="ma-2 pa-6">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn v-if="filterActive" color="primary" dark v-on:click="buildFilter(), editList(), showFilter = !showFilter"
          rounded class="ma-2 pa-6">
          <v-icon>mdi-filter-remove</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-card class="pa-3" v-if="showFilter" width="500">
        <v-card-title class="justify-center text-h5 pa-0">
          Filter your search
        </v-card-title>
        <!-- les filtres -->
        <v-list>
          <v-list-group v-for="item in filter" :key="item.title" v-model="item.active" :prepend-icon="item.action"
            no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <div class="text-subtitle-1" slot="activator">{{ item.title }}</div>
              </v-list-item-content>
            </template>
            <!--a l'interieur des filtres-->
            <v-list-item v-for="price in item.select" :key="price.name">
              <v-checkbox :label="price.name" v-model="price.active" @click="editList()"></v-checkbox>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </div>
    <div class="contentRestaurant">
      <div v-for="item in restaurantsFilter" class="boxContent">
        <itemRestaurant :restaurant="item" />
      </div>
    </div>
  </div>
</template>

<script>
import itemRestaurant from '~/components/common/itemRestaurant.vue';
export default {
  name: 'ListRestaurant',
  components: {
    itemRestaurant
  },
  data() {
    return {
      restaurant: {},
      restaurants: {},
      showFilter: false,
      filter: [],
      filterActive: false,
      restaurantsFilter: {},
      displayFiler: false,
    }
  },
  async mounted() {
    this.$cookies.set('restaurantId', null)
    await this.getRestaurants();
    await this.getVisitedRestaurants();
    this.buildFilter();
  },
  methods: {
    // create list of restaurants from API
    async getRestaurants() {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.get(`/restaurants`, { headers: headers });
        this.restaurants = response.data.items;
      } catch (error) {
        console.error(error);
      }
    },
    // set list of restaurants with last visit
    async getVisitedRestaurants() {
      try {
        const id = this.$cookies.get('id');
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.get(`/users/${id}/restaurants/visits`, { headers: headers });
        for (let y = 0; y < this.restaurants.length; y++) {
          this.restaurants[y].visited = false
          for (let i = 0; i < response.data.items.length; i++) {
            if (response.data.items[i].restaurant_id === this.restaurants[y].id) {
              this.restaurants[y].visited = true
              break;
            }
          }
        }
        this.restaurantsFilter = JSON.parse(JSON.stringify(this.restaurants));
      } catch (error) {
        console.error(error);
      }
    },
    // build list of attribut filter
    buildFilter() {
      this.filter = []
      this.filter.push({
        title: 'Select price',
        select: []
      });
      let str = "$"
      for (let i = 0; i < 3; i++) {
        this.filter[0].select.push({
          name: str,
          value: i + 1,
          active: false
        })
        str += "$"
      }
      this.filter.push({
        title: 'Select type',
        select: []
      });
      for (let i = 0; i < this.restaurants.length; i++)
        for (let y = 0; y < this.restaurants[i].genres.length; y++)
          for (let x = 0; 1; x++) {
            if (x >= this.filter[1].select.length) {
              this.filter[1].select.push({
                name: this.restaurants[i].genres[y],
                value: this.restaurants[i].genres[y],
                active: false
              })
              break;
            } else if (this.filter[1].select[x].name === this.restaurants[i].genres[y])
              break;
          }
      this.filter.push({
        title: 'Select visited',
        select: [
          {
            name: 'Only visited',
            value: true,
            active: false
          }
        ]
      });
    },
    // Sort Restaurants by name
    shearchFilter(value) {
      for (let i = 0; i < this.restaurantsFilter.length; i++) {
        this.restaurantsFilter[i].name = this.restaurantsFilter[i].name.toLowerCase()
        if (this.restaurantsFilter[i].name.indexOf(value) == -1) {
          this.restaurantsFilter.splice(i, 1)
          i--
        }
      }
    },
    // Sort Restaurants by price
    priceFilter() {
      this.filterActive = true
      let price = 0
      for (let i = 0; i < this.restaurantsFilter.length; i++) {
        price = this.restaurantsFilter[i].price_range - 1
        if (this.filter[0].select[price].active)
          this.restaurantsFilter[i].priceValid = true
      }
      for (let i = 0; i < this.restaurantsFilter.length; i++)
        if (!this.restaurantsFilter[i].priceValid) {
          this.restaurantsFilter.splice(i, 1)
          i--
        }
    },
    // Sort Restaurants by genrder
    genderFilter() {
      this.filterActive = true
      for (let i = 0; i < this.restaurantsFilter.length; i++)
        for (let y = 0; y < this.filter[1].select.length; y++)
          if (this.filter[1].select[y].active)
            if (this.restaurantsFilter[i].genres.includes(this.filter[1].select[y].name))
              this.restaurantsFilter[i].validGender = true
      for (let i = 0; i < this.restaurantsFilter.length; i++)
        if (!this.restaurantsFilter[i].validGender) {
          this.restaurantsFilter.splice(i, 1)
          i--
        }
    },
    visitedFilter() {
      this.filterActive = true
      for (let i = 0; i < this.restaurantsFilter.length; i++)
        if (!this.restaurantsFilter[i].visited) {
          this.restaurantsFilter.splice(i, 1)
          i--
        }
    },
    editList() {
      this.restaurantsFilter = JSON.parse(JSON.stringify(this.restaurants));
      let value = document.getElementById("input").value.toLowerCase()
      this.filterActive = false
      for (let y = 0; y < this.filter[0].select.length; y++)
        if (this.filter[0].select[y].active)
          this.priceFilter()
      for (let y = 0; y < this.filter[1].select.length; y++)
        if (this.filter[1].select[y].active)
          this.genderFilter()
      if (this.filter[2].select[0].active)
        this.visitedFilter()
      if (value)
        this.shearchFilter(value)
    },
  },
}
</script>

<style scoped>
.shearchBar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ffffff;
  height: 35px;
  color: #ffffff;
  border-radius: 10px;
  width: 90%;
}

.inputSearch {
  color: #ffffff;
  border: none;
  width: 100%;
  border-left: #ffffff 1px solid;
  padding-left: 10px;
  height: 35px;
}

.inputSearch:focus {
  outline: none;
}

.boxSearch {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.contentRestaurant {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 40%);
  align-items: center;
  grid-column-gap: 10vw;
  justify-content: center;
}

.boxContent {
  display: flex;
  flex-direction: column;
  border: solid 1px #ffffff;
  margin-top: 30px;
  border-radius: 25px;
  cursor: pointer;
}

@media screen and (max-width: 1024px) {
  .contentRestaurant {
    grid-template-columns: repeat(1, 100%);
    grid-column-gap: 0;
  }
}
</style>
