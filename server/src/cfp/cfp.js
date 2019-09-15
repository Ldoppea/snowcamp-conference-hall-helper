const axios = require('axios')

axios.defaults.baseURL = 'https://www.conference-hall.io/api/'
axios.defaults.timeout = 100000

const getAxiosConfig = (cfpbearer) => {
  const config = {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'Authorization': cfpbearer
    }
  }

  return config
}

// Get submissions from the event
const getSubmissions = (config, apiToken) => {
  return Promise.all([
    axios.get(`v1/event/mB6d6o0uQONgUiFuo9We?key=${apiToken}`, config),
    axios.get(`private/export/mB6d6o0uQONgUiFuo9We?sortOrder=newest&output=json`, config)
  ]).then(([publicEvent, privateEvent]) => {
      return {
        publicEvent: publicEvent.data,
        privateEvent: privateEvent.data
      }
    })
    .then(retrieveSubmissionsFromEvent)
    .catch(error => {
      console.log(error)
      throw error
    })
}

const getTalkFormat = (event, formatId) => {
  if (formatId === undefined) {
    return ''
  }

  return event.formats.find(format => format.id === formatId).name
}

const getTalkCategory = (event, categoryId) => {
  if (categoryId === undefined) {
    return ''
  }

  return event.categories.find(category => category.id === categoryId).name
}

const getTalkSpeaker = (privateEvent, talk) => {
  return privateEvent.speakers
    .filter(speaker => speaker.uid === talk.speakers[0]) // TODO : Retourner plusieurs speakers
    .map(speaker => {
      console.log(speaker)
      let country = ''
      if (speaker.address && speaker.address.country) {
        country = speaker.address.country.long_name
      }
      return {
        name: speaker.displayName,
        email: speaker.email,
        location: country
      }
    })[0]
}

const getTalkFeedbacks = (privateEvent, talk) => {
  const privateTalkData = privateEvent.talks.find(privateTalk => privateTalk.title === talk.title && privateTalk.abstract === talk.abstract)
  
  return privateTalkData.organizersThread
    .map(feedback => {
      return {
        id: feedback.id,
        body: feedback.message,
        created_at: feedback.date._seconds,
        user : {
          name : ''
        }
      }
    })
}

const getTalkRatings = (privateEvent, talk) => {
  const privateTalkData = privateEvent.talks.find(privateTalk => privateTalk.title === talk.title && privateTalk.abstract === talk.abstract)

  return privateTalkData.organizersThread
    .map(rating => {
      return {
        id: rating.id,
        comments: rating.message,
        created_at: rating.date._seconds,
        user: {
          name: ''
        }
      }
    })
}

const retrieveSubmissionsFromEvent = (events) => {
  return events.publicEvent.talks.map(currentTalk => {
    return {
      id: currentTalk.id,
      state: currentTalk.state,
      talk: {
        title: currentTalk.title,
        description: currentTalk.abstract,
        talk_format: getTalkFormat(events.publicEvent, currentTalk.formats)
      },
      language: currentTalk.language || '',
      tags: [getTalkCategory(events.publicEvent, currentTalk.categories) ],
      profile: getTalkSpeaker(events.privateEvent, currentTalk),
      feedback: [],
      ratings: getTalkRatings(events.privateEvent, currentTalk)
    }
  })
}

const getEvent = (config, apiToken) => {
  return axios.get(`v1/event/mB6d6o0uQONgUiFuo9We?key=${apiToken}`, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

const getApi = (cfpToken, cfpbearer) => {
  const axiosConfig = getAxiosConfig(cfpbearer)
  console.log({axiosConfig})
  return {
    getEvent: () => getEvent(axiosConfig, cfpToken),
    getSubmissions: () => getSubmissions(axiosConfig, cfpToken)
  }
}

module.exports = {
  getApi
}
