<template>
  <v-container fluid class="pa-0">
    <CreateNewList @newListEvent="appendFavorites" />
    <v-switch v-model="showAll" :label="`Display all lists`" @click="getLists()" />
    <v-list>
      <div class="text-subtitle-1">List FAVORITES</div>
      <v-list-group v-for="item in listsfavorits" :key="item.id" v-model="item.active" :prepend-icon="item.action"
        no-action>
        <template v-slot:activator>
          <!-- Lists Favorites -->
          <v-list-item-content @click="listeActivated = listActive === item.id ? false : true,
            listActive = listeActivated ? item.id : null,
            editMode = false">
            <div class="d-flex">
              <v-btn v-if="listActive === item.id" @click="deleteList(item.id)" small icon>
                <v-icon>mdi-playlist-remove</v-icon>
              </v-btn>
              <v-btn v-if="listActive === item.id && Addon === true" @click="addResto(item.id)" small icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn v-if="listActive === item.id" @click.stop="editMode = !editMode" small icon>
                <v-icon>mdi-playlist-edit</v-icon>
              </v-btn>
              <v-btn v-else @click.stop="editMode = true, listActive = item.id" small icon>
                <v-icon>mdi-playlist-edit</v-icon>
              </v-btn>
              <div v-if="!editMode || item.id !== listActive" class="text-subtitle-1"
                v-text="truncateItemName(item.name, 50)"></div>
              <v-text-field v-if="editMode && item.id === listActive" v-model="item.name" @click.stop
                @keyup.enter="nickname(item.id, item.name), editMode = false" label="Name of the list"
                :rules="[v => !!v || 'Name required', v => /^[a-zA-Z0-9]+$/.test(v) || 'Name invalid']" :counter="50"
                :maxlength="50" required></v-text-field>
            </div>
          </v-list-item-content>
        </template>
        <!-- Restaurant -->
        <v-list-item v-for="child in item.restaurants" :key="child.id">
          <v-list-item-content>
            <div class="d-flex">
              <v-btn @click="deleteResto(item.id, child.id)" icon>
                <v-icon>mdi-tag-remove</v-icon>
              </v-btn>
              <v-btn @click="goToRestaurant(child.id)" rounded class="text-subtitle-1">
                {{ child.name }}
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <!-- button action -->
    <v-row class="justify-center pa-2">
      <v-col class="d-flex justify-center">
        <v-btn rounded @click="pagePrev()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field v-model="pageList" @keyup.enter="getLists()" type="number"></v-text-field>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-btn rounded @click="pageNext()">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateNewList from './CreateNewList.vue'
export default {
  name: 'DisplayFavorites',
  components: {
    CreateNewList
  },
  props: {
    Addon: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      listeActivated: false,
      listActive: '',
      listsfavorits: [],
      pageList: 0,
      showAll: false,
      editMode: false,
    }
  },
  async mounted() {
    await this.getLists();
  },
  methods: {
    addList() {
      this.listsfavorits.push(this.newList)
    },
    // get page lists of favorites
    async getLists() {
      if (this.showAll) {
        await this.getPageLists(this.pageList);
      } else {
        await this.getFavLists(this.pageList);
      }
      for (let i = 0; i < this.listsfavorits.length; i++)
        if (this.listsfavorits[i].restaurants.length > 0) {
          for (let j = 0; j < this.listsfavorits[i].restaurants.length; j++) {
            await this.getResto(this.listsfavorits[i].restaurants[j].id)
          }
        }
    },
    // get list favorites by page
    async getPageLists(page) {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.get(`/favorites?page=${page}`, { headers: headers });
        this.listsfavorits = response.data.items;
      } catch (error) {
        console.error(error);
      }
    },
    // get list favorites by page when owner
    async getFavLists(page) {
      try {
        const id = this.$cookies.get('id');
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.get(`/users/${id}/favorites?page=${page}`, { headers: headers });
        this.listsfavorits = response.data.items;
      } catch (error) {
        console.error(error);
      }
    },
    // Nickname list of favorites
    async nickname(list_id, newName) {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const data = {
          name: newName,
        }
        const response = await this.$axios.put(`/favorites/${list_id}`, data, { headers: headers });
      } catch (error) {
        console.error(error);
      }
    },
    // get and set restaurant name
    async getResto(resto_id) {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.get(`/restaurants/${resto_id}`, { headers: headers });
        for (let i = 0; i < this.listsfavorits.length; i++)
          if (this.listsfavorits[i].restaurants.length > 0)
            for (let j = 0; j < this.listsfavorits[i].restaurants.length; j++)
              if (this.listsfavorits[i].restaurants[j].id === resto_id)
                this.listsfavorits[i].restaurants[j].name = response.data.name;
      } catch (error) {
        console.error(error);
      }
    },
    // add restaurant to list of favorites
    async addResto(idlist) {
      try {
        const restaurantId = await this.$cookies.get('restaurantId');
        for (let i = 0; i < this.listsfavorits.length; i++)
          if (this.listsfavorits[i].restaurants.length > 0)
            for (let j = 0; j < this.listsfavorits[i].restaurants.length; j++)
              if (this.listsfavorits[i].restaurants[j].id === restaurantId)
                return;
        const headers = {
          authorization: this.$cookies.get('token'),
        }
        const data = {
          id: restaurantId,
        }
        const response = await this.$axios.post(`/favorites/${idlist}/restaurants`, data, { headers: headers });
        await this.getLists()
      } catch (error) {
        console.error(error);
      }
    },
    appendFavorites(newList) {
      this.listsfavorits.push(newList)
    },
    ////////////////////////////

    // Access to restaurant page
    async goToRestaurant(id) {
      await this.$cookies.set('restaurantId', id)
      if (this.$router.currentRoute.name === 'restaurant')
        this.$router.go()
      else
        this.$router.push({ name: 'restaurant', params: { id: id } })
    },
    // delete list of favorites
    async deleteList(id) {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.delete(`/favorites/${id}`, { headers: headers });
        await this.getLists();
      } catch (error) {
        console.error(error);
      }
    },
    // delete restaurant of list of favorites
    async deleteResto(idlist, idresto) {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        };
        const response = await this.$axios.delete(`/favorites/${idlist}/restaurants/${idresto}`, { headers: headers });
        await this.getLists();
      } catch (error) {
        console.error(error);
      }
    },
    ////////////////////////////

    // Navigation page
    async pagePrev() {
      this.pageList = this.pageList > 0 ? this.pageList - 1 : 0;
      await this.getLists();
    },
    async pageNext() {
      this.pageList = parseInt(this.pageList, 10);
      this.pageList = this.pageList >= 0 ? this.pageList + 1 : 0;
      await this.getLists();
      if (this.listsfavorits.length === 0)
        this.pagePrev();
    },
    truncateItemName(name, maxLength) {
      try {
        if (name && name.length > maxLength) {
          return name.slice(0, maxLength) + '...';
        }
        return name;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
