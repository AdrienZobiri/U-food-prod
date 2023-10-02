// plugins/vue2-google-maps.js
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAGllsdBqQUNjE8rAz_uvYutlrk-Tm7INo",
    libraries: 'places', // Vous pouvez ajouter d'autres bibliothèques si nécessaire
  },
})
