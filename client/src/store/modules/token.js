import * as mutationTypes from '../mutation-types'
import * as actionTypes from '../action-types'

// initial state
const state = {
  cfpToken: undefined,
  cfpBearer: undefined,
  cfpEmail: undefined,
  filterByEmail: false,
  isLoading: false
}

// getters
const getters = {
  cfpToken: state => state.cfpToken,
  cfpBearer: state => state.cfpBearer,
  cfpEmail: state => state.cfpEmail,
  filterByEmail: state => state.filterByEmail,
  isLoading: state => state.isLoading
}

// actions
const actions = {
  async [actionTypes.ACTION_INIT_CFP_TOKEN] ({ commit, dispatch }, { cfpToken, cfpBearer, cfpEmail }) {
    await commit(mutationTypes.IS_LOADING_TRUE)
    await commit(mutationTypes.INIT_CFP_TOKEN, { cfpToken })
    await commit(mutationTypes.INIT_CFP_BEARER, { cfpBearer })
    await commit(mutationTypes.INIT_CFP_EMAIL, { cfpEmail })
    await dispatch(actionTypes.ACTION_INIT_EVENT, { cfpToken, cfpBearer })
    await dispatch(actionTypes.ACTION_INIT_SUBMISSIONS, { cfpToken, cfpBearer })
    await commit(mutationTypes.IS_LOADING_FALSE)
  }
}

// mutations
const mutations = {
  [mutationTypes.INIT_CFP_TOKEN] (state, { cfpToken }) {
    state.cfpToken = cfpToken
  },
  [mutationTypes.INIT_CFP_BEARER] (state, { cfpBearer }) {
    state.cfpBearer = cfpBearer
  },
  [mutationTypes.INIT_CFP_EMAIL] (state, { cfpEmail }) {
    state.cfpEmail = cfpEmail
  },
  [mutationTypes.IS_LOADING_TRUE] (state) {
    state.isLoading = true
  },
  [mutationTypes.IS_LOADING_FALSE] (state) {
    state.isLoading = false
  },
  [mutationTypes.SET_EMAIL_FILTER] (state, value) {
    state.filterByEmail = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
