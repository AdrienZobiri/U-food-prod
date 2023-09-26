export { default as CommonCarousel } from '../../components/common/carousel.vue'
export { default as PagesDetailsInfosRestaurantComponent } from '../../components/pages/details/InfosRestaurantComponent.vue'
export { default as PagesDetailsMapRestaurantComponent } from '../../components/pages/details/MapRestaurantComponent.vue'
export { default as PagesDetailsPhotosRestaurantComponent } from '../../components/pages/details/PhotosRestaurantComponent.vue'
export { default as PagesFavorisAddFavourites } from '../../components/pages/favoris/AddFavourites.vue'
export { default as PagesFavorisDisplayFavourites } from '../../components/pages/favoris/DisplayFavourites.vue'
export { default as PagesIndexListRestaurant } from '../../components/pages/index/listRestaurant.vue'
export { default as PagesProfilDisplayHistory } from '../../components/pages/profil/DisplayHistory.vue'
export { default as PagesProfilDisplayUserSettings } from '../../components/pages/profil/DisplayUserSettings.vue'
export { default as PagesProfilLogin } from '../../components/pages/profil/login.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
