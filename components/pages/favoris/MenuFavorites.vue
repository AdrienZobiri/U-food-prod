<template>
  <v-col class="overflow-auto scroll">
    <DisplayFavorites :Addon="false" />
  </v-col>
</template>

<script>
import DisplayFavorites from './DisplayFavorites.vue';
export default {
  name: 'MenuFavorites',
  components: {
    DisplayFavorites
  },
  data() {
    return {
      editMode: false, // unused for the moment but need to keep
    }
  },
}
</script>

<style>
.scroll {
  height: auto;
}
</style>
