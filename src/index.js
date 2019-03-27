import VueCredCard from './VueCredCard.vue'
import defaultOptions from './options'
import creditCardType from 'credit-card-type'

function plugin (Vue, options = {}) {
  const opt = Object.assign(defaultOptions, options)
  const { cards = [] } = opt

  for (const index in cards) {
    creditCardType.addCard(cards[index])
  }

  Vue.component('VueCredCard', VueCredCard)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  creditCardType,
  VueCredCard,
  version
}