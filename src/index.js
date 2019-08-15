import VueCredCard from './VueCredCard.vue'
import defaultOptions from './options'
import creditCardType from 'credit-card-type'
import './styles/main.scss'

// Version
const version = '0.0.0'

function install (Vue, options = {}) {
  const opt = Object.assign(defaultOptions, options)
  const { cards = [] } = opt

  for (const index in cards) {
    creditCardType.addCard(cards[index])
  }

  Vue.component('VueCredCard', VueCredCard)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// Export all components too
export default {
  version,
  creditCardType,
  VueCredCard,
  install
}