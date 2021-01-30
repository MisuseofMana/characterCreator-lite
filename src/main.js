import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDice, faEyeSlash, faCheck, faEye, faRetweet, faHandPointUp, faPalette, faLayerGroup, faSlash, faCompressAlt, faCompressArrowsAlt, faExpandAlt, faExpandArrowsAlt, faUndo, faBan, faArrowUp, faArrowLeft, faArrowRight, faArrowDown, faCircle, faAngleDoubleDown, faAngleDoubleUp, faAngleDoubleLeft, faAngleDoubleRight, faSync } from '@fortawesome/free-solid-svg-icons'
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
library.add(faSlash)
library.add(faBan)
library.add(faUndo)
library.add(faCompressAlt)
library.add(faCompressArrowsAlt)
library.add(faExpandAlt)
library.add(faExpandArrowsAlt)
library.add(faLayerGroup)
library.add(faHandPointUp)
library.add(faPalette)
library.add(faEyeSlash)
library.add(faEye)
library.add(faRetweet)
library.add(faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
