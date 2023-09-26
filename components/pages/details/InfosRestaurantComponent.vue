<template>
  <div id="main">
    <div id="title" >
      <div class="restaurantName">
      {{restaurantName}}
      </div>
      <div class="genre" v-for="(genre, index) in restaurantGenre" :key="index">
        <p>Genre: {{genre}}</p>
      </div>
      <div>
        {{restaurantAddress}}
      </div>
      <div>
        <p>Tel: {{restaurantTel}}</p>
      </div>
    </div>

    <div id="pricing">
      <div class="star-pricing">
        <input type="radio" id="star5" name="rating" value="5" v-model="Math.round(restaurantPriceRange)" disabled>
        <label for="star5"></label>
        <input type="radio" id="star4" name="rating" value="4" v-model="Math.round(restaurantPriceRange)" disabled>
        <label for="star4"></label>
        <input type="radio" id="star3" name="rating" value="3" v-model="Math.round(restaurantPriceRange)" disabled>
        <label for="star3"></label>
        <input type="radio" id="star2" name="rating" value="2" v-model="Math.round(restaurantPriceRange)" disabled>
        <label for="star2"></label>
        <input type="radio" id="star1" name="rating" value="1" v-model="Math.round(restaurantPriceRange)" disabled>
        <label for="star1"></label>
      </div>
    </div>
  <div id="rating">
    <div class="star-rating">
      <input type="radio" id="star5" name="rating" value="5" v-model="Math.round(restaurantRating)" disabled>
      <label for="star5"></label>
      <input type="radio" id="star4" name="rating" value="4" v-model="Math.round(restaurantRating)" disabled>
      <label for="star4"></label>
      <input type="radio" id="star3" name="rating" value="3" v-model="Math.round(restaurantRating)" disabled>
      <label for="star3"></label>
      <input type="radio" id="star2" name="rating" value="2" v-model="Math.round(restaurantRating)" disabled>
      <label for="star2"></label>
      <input type="radio" id="star1" name="rating" value="1" v-model="Math.round(restaurantRating)" disabled>
      <label for="star1"></label>
    </div>

    <div class="genre" v-for="(open, index) in restaurantOpeningHours" :key="index">
      <p>{{index}}: {{open}}</p>
    </div>
  </div>
    </div>
</template>

<script>
  export default {
    props: {
      restaurantName: {
        type: String,
        required: true,
      },
      restaurantAddress: {
        type: String,
        required: true,
      },
      restaurantOpeningHours: {
        type: Array,
        required: true,
      },
      restaurantTel: {
        type: String,
        required: true,
      },
      restaurantRating: {
        type: Number,
        required: true,
      },
      restaurantPriceRange: {
        type: Number,
        required: true,
      },
      restaurantGenre : {
        type: Array,
        required: true,
      },
    },
  }

</script>

<style>
  #main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }

  #title {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: white;
  }

  #rating {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: white;
    text-align: right;
  }

  #pricing {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: white;
    text-align: right;
  }
  .restaurantName {
    font-size: 30px;
  }

  .genre {
    font-size: 20px;
  }

  .star-rating {
    display: inline-block;
  }
  .star-pricing {
    display: inline-block;
  }

  input[type="radio"] {
    display: none;
  }

  label {
    font-size: 30px;
    padding: 5px;
    cursor: pointer;
  }

  label::before {
    content: "★";
    display: inline-block;
    color: transparent;
  }

  input[type="radio"]:checked ~ label::before {
    color: gold;
  }
</style>
