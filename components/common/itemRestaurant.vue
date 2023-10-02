<template>
    <div>
        <Carousel :items="restaurant.pictures" :id="restaurant.id"/>
        <div class="d-flex justify-space-around align-center">
            <div class="contentInfo">
                <div class="text-subtitle-1">{{restaurant.name}}</div>
            </div>
            <div v-if="visited" class="align-center">
                <div @click="modal = !modal" class="text-subtitle-2 visited">Visited</div>
            </div>
            <div v-else class="align-center">
                <div @click="modal = !modal" class="text-subtitle-2 visited">Not visited</div>
            </div>
        </div>
        <v-dialog
            v-model="modal"
            max-width="290"
        >
            <v-card
                class="d-flex justify-center flex-column pa-8"
            >
                <v-card-title class="text-h5">
                    Visit Card
                </v-card-title>
                <v-text-field
                    dense
                    label="Date"
                    v-model="dateVisit"
                    type="date"
                ></v-text-field>
                <v-text-field
                    dense
                    label="Rate (1-5)"
                    type="number"
                    max="5"
                    min="0"
                    v-model="rate"
                ></v-text-field>
                <v-textarea
                    label="Comment"
                    v-model="comment"
                    auto-grow>
                </v-textarea>
                <v-btn @click="newVisite()">
                    Validate
                </v-btn>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Carousel from '@/components/common/carousel.vue';
export default {
    name: 'ItemRestaurant',
    components: {
        Carousel
    },
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            visited: false,
            modal: false,
            comment: '',
            rate: 0,
            dateVisit: ''
        }
    },
    mounted() {
        if (this.restaurant.visited) {
            this.visited = true;
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
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
.visited:hover {
    cursor: pointer;
    text-decoration: underline;
}
.contentInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vw;
}
</style>
