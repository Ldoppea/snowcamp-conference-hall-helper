import * as mutationTypes from '../mutation-types'
import * as actionTypes from '../action-types'

import CfpService from '@/services/cfp-service'

// initial state
const state = {
  event: undefined
}

// getters
const getters = {
  event: state => state.event
}

// actions
const actions = {
  async [actionTypes.ACTION_INIT_EVENT] ({ commit }, { cfpToken }) {
    console.log('load event')
    const response = await CfpService.fetchEvent(cfpToken)

    commit(mutationTypes.INIT_EVENT, {
      event: response.data
    })
  }
}

// mutations
const mutations = {
  [mutationTypes.INIT_EVENT] (state, { event }) {
    state.event = event
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
