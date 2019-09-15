import api from '@/services/api'

export default {
  fetchSubmissions (cfpToken) {
    return api().post('submissions', {
      token: cfpToken
    })
  },
  fetchEvent (cfpToken) {
    return api().post('event', {
      token: cfpToken
    })
  }
}
