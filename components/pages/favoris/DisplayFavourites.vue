<template>
    <v-list>
        <v-subheader>FAVOURITES</v-subheader>
        <v-list-item v-for="item in restaurants" :key="item.id">
            <v-list-item-icon>
                <v-icon color="yellow">mdi-star-off</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'DisplayFavourites',
    // props: {
    //   restaurants: Array,
    // }
    data() {
        return {
            restaurants: [
                {
                    id: 1,
                    name: 'Restaurant 1',
                    description: 'Description 1',
                },
                {
                    id: 2,
                    name: 'Restaurant 2',
                    description: 'Description 2',
                },
                {
                    id: 3,
                    name: 'Restaurant 3',
                    description: 'Description 3',
                }
            ]
        }
    },
}

</script>
