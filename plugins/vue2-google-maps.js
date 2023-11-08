// plugins/vue2-google-maps.js
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDO8P9qif4-lHCQyuLYDEPEVaEGYSq2aIk",
    libraries: 'places',
  },
})
