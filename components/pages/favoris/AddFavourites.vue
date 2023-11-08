<template>
  <v-dialog v-model="dialog" max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" rounded class="ma-2 pa-6">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-6">
      <v-card-title class="justify-center text-h5">
        FAVORITES
      </v-card-title>
      <DisplayFavorites :Addon="true"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DisplayFavorites from './DisplayFavorites.vue';
export default {
  name: 'AddFavourites',
  components: {
    DisplayFavorites
  },
  data() {
    return {
      dialog: false,
    }
  }
}
</script>
