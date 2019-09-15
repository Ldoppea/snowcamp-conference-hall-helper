<template>
  <div class="navigator">
    <input v-model="apiToken" placeholder="Conference Hall API Token" v-on:keyup.enter="submit">
    <input v-model="emailAddress" placeholder="Email address" v-on:keyup.enter="submit">
    <button v-on:click="submit">Load data</button>
    <br />
    <label for="filterEmail">Filter rated by you</label>
    <input type="checkbox" id="filterEmail" v-model="filterByEmail">

    <div>
      <div v-for="status in statusList" :key="status.name">
        <input type="checkbox" :name="'checkbox-status-' + status.name" @click="clickCb(status)" :checked="status.value"/>
        <label :for="'checkbox-status-' + status.name">{{status.name}}</label>
      </div>
    </div>

    <div id="nav" v-if="isLoaded">
      <router-link to="/">Authors</router-link> |
      <router-link to="/languages">Languages</router-link> |
      <router-link to="/tags">Tags</router-link> |
      <router-link to="/travelers">Travelers</router-link>
    </div>
    <router-view v-if="isLoaded"/>
    <div class="loading-spinner" v-if="isLoading">
      <atom-spinner
        :animation-duration="1000"
        :size="40"
        :color="'#FF0000'"
      />
    </div>
  </div>
</template>

<script>
import * as actions from '@/store/action-types'
import * as mutations from '@/store/mutation-types'

import { AtomSpinner } from 'epic-spinners'

export default {
  name: 'navigator',
  components: {
    AtomSpinner
  },
  data () {
    return {
      apiToken: '',
      emailAddress: ''
    }
  },
  mounted () {
    this.apiToken = localStorage.getItem('CFP_TOKEN')
    this.emailAddress = localStorage.getItem('CFP_EMAIL')
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    isLoaded () {
      return this.$store.getters.submissions.length !== 0 && this.$store.getters.event !== undefined
    },
    statusList () {
      return this.$store.getters.filterStatus
    },
    filterByEmail: {
      get () {
        return this.$store.getters.filterByEmail
      },
      set (value) {
        this.$store.commit(mutations.SET_EMAIL_FILTER, value)
      }
    }
  },
  methods: {
    submit () {
      localStorage.setItem('CFP_TOKEN', this.apiToken)
      localStorage.setItem('CFP_EMAIL', this.emailAddress)
      this.$store.dispatch(actions.ACTION_INIT_CFP_TOKEN, {
        cfpToken: this.apiToken,
        cfpEmail: this.emailAddress
      })
    },
    clickCb (status) {
      this.$store.commit(mutations.SET_STATUS_FILTER, {
        statusName: status.name,
        value: !status.value
      })
    }
  }
}
</script>

<style lang="scss">
.loading-spinner {
  position: absolute;
  left: 50%;
  top: 10px;
}
#nav {
  text-align: left;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
