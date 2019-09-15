import Vue from 'vue'
import Vuex from 'vuex'

import submissions from '@/store/modules/submissions'
import event from '@/store/modules/event'
import token from '@/store/modules/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  modules: {
    submissions,
    event,
    token
  },
  mutations: {

  },
  actions: {

  }
})
