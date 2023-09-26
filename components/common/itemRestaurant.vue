<template>
    <div>
        <Carousel :items="restaurant.pictures" :id="restaurant.id"/>
        <div class="d-flex justify-space-around align-center">
            <div class="contentInfo">
                <div class="text-subtitle-1">{{restaurant.name}}</div>
            </div>
            <div v-if="visited" class="align-center">
                <div @click="modal = !modal" class="text-subtitle-2">Visited</div>
            </div>
            <div v-else class="align-center">
                <div @click="modal = !modal" class="text-subtitle-2">Not visited</div>
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
                <v-textarea
                    label="Comment"
                    v-model="comment"
                    auto-grow>
                </v-textarea>
                <v-text-field
                    dense
                    label="Rate (1-5)"
                    type="number"
                    max="5"
                    min="0"
                    v-model="rate"
                ></v-text-field>
                <v-text-field
                    dense
                    label="Date"
                    v-model="DateVisit"
                ></v-text-field>
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
            DateVisit: ''
        }
    },
    mounted() {
        if (this.restaurant.visited) {
            this.visited = true;
        }
    },
    methods: {
        newVisite() {
            console.log("test")
            // this.$emit('newVisite', {
            //     comment: this.comment,
            //     rate: this.rate,
            //     DateVisit: this.DateVisit
            // })
        }
    }
}
</script>

<style scoped>
.contentInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vw;
}
</style>