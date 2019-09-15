import api from '@/services/api'

export default {
  fetchSubmissions (cfpToken, cfpBearer) {
    return api().post('submissions', {
      token: cfpToken,
      bearer: cfpBearer
    })
  },
  fetchEvent (cfpToken, cfpBearer) {
    return api().post('event', {
      token: cfpToken,
      bearer: cfpBearer
    })
  }
}
