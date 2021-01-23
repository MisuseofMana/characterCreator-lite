import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDice, faArrowUp, faArrowLeft, faArrowRight, faArrowDown, faCircle, faAngleDoubleDown, faAngleDoubleUp, faAngleDoubleLeft, faAngleDoubleRight, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowUp)
library.add(faArrowDown)
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faCircle)
library.add(faAngleDoubleRight)
library.add(faAngleDoubleUp)
library.add(faAngleDoubleDown)
library.add(faAngleDoubleLeft)
library.add(faSync)
library.add(faDice)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
