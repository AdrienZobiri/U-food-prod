<template>
  <v-dialog v-model="modal" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="visited" rounded @click="modal = !modal" class="text-subtitle-2 visited">Visited</v-btn>
      <v-btn v-else rounded @click="modal = !modal" class="text-subtitle-2 visited pa-1">Not visited</v-btn>
    </template>

    <v-card class="d-flex justify-center flex-column pa-8">
      <v-card-title class="text-h5">
        Visit Card
      </v-card-title>
      <v-text-field dense label="Date" v-model="dateVisit" type="date"></v-text-field>
      <v-text-field dense label="Rate (1-5)" type="number" max="5" min="0" v-model="rate"></v-text-field>
      <v-textarea label="Comment" v-model="comment" auto-grow>
      </v-textarea>
      <v-btn @click="newVisite()">
        Validate
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Visited',
  props: {
    visited: {
      type: Boolean,
      required: true
    },
    modal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      comment: '',
      rate: 0,
      dateVisit: ''
    }
  },
  methods: {
    async newVisite() {
      const params = {
        restaurant_id: this.restaurant.id,
        comment: this.comment,
        rating: this.rate,
        date: this.dateVisit,
        access_token: this.$cookies.get('token')
      };

      try {
        const id = this.$cookies.get('id');
        const response = await this.$axios.post(`/users/${id}/restaurants/visits`, params);
        location.reload();
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
