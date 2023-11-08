<template>
  <v-container class="pa-0">
    <v-switch v-model="regis" :label="`New list ?`" />
    <v-text-field v-if="regis" v-model="newListName" @keyup.enter="createNewList()" label="Name of the list"
      :rules="[v => !!v || 'Name required', v => /^[a-zA-Z0-9]+$/.test(v) || 'Name invalid']" :counter="50"
      :maxlength="50" required></v-text-field>
    <v-btn v-if="regis" :disabled="!newListName" color="green darken-1" text @click="createNewList()">
      Create
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'CreateNewList',
  data() {
    return {
      newListName: '',
      regis: false,
    }
  },
  methods: {
    // create a new list of favorite and add this restaurant to this list
    async createNewList() {
      try {
        const headers = {
          authorization: this.$cookies.get('token'),
        }
        const data = {
          name: this.newListName,
        }
        const response = await this.$axios.post(`/favorites`, data, { headers: headers });
        this.$emit('newListEvent', response.data);
        this.newListName = '';
        this.regis = false;
      } catch (error) {
        console.error(error);
      }
    },
  }
}

</script>
