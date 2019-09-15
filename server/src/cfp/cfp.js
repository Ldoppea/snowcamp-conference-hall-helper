const axios = require('axios')
const PromiseBb = require("bluebird");

const MAX_CONCURRENT = 20

axios.defaults.baseURL = 'https://www.papercall.io/api/v1/'
axios.defaults.timeout = 100000

const getAxiosConfig = (cfpToken) => {
  const config = {
    headers: {
      'Authorization' : cfpToken
    }
  }

  return config
}

// Get X submissions from the event, by submission state
const getSubmissionsByState = (numberOfSubmissions, state, config) => {
  return axios.get(`submissions?per_page=${numberOfSubmissions}&state=${state}`, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

// Get X submissions from the event
const getSubmissions = (numberOfSubmissions, config) => {
  return Promise.all([
    getSubmissionsByState(numberOfSubmissions, 'submitted', config),
    getSubmissionsByState(numberOfSubmissions, 'accepted', config),
    getSubmissionsByState(numberOfSubmissions, 'rejected', config),
    getSubmissionsByState(numberOfSubmissions, 'waitlist', config)
  ]).then(([submitted, accepted, rejected, waitlist]) => {
      return [
        ...submitted,
        ...accepted,
        ...rejected,
        ...waitlist
      ]
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

// Get feedbacks by submissionId
const getSubmissionFeedback = (submissionId, config) => {
  console.log('getSubmissionFeedback', submissionId)
  return axios.get(`submissions/${submissionId}/feedback`, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

// Fill specified submission object with its feedbacks
const retrieveFeedbackIntoSubmission = (submission, config) => {
  return getSubmissionFeedback(submission.id, config)
    .then(feedback => {
      return {
        ...submission,
        feedback
      }
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

// Fill all specified submissions objects with their feedbacks 
const retrieveFeedbackIntoSubmissions = (submissions, config) => {
  return PromiseBb.map(
    submissions,
    submission => retrieveFeedbackIntoSubmission(submission, config),
    { concurrency: MAX_CONCURRENT }
  )
  .catch(error => {
    console.log(error)
    throw error
  })
}

// Get ratings by submissionId
const getSubmissionRatings = (submissionId, config) => {
  console.log('getSubmissionRatings', submissionId)
  return axios.get(`submissions/${submissionId}/ratings`, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

// Fill specified submission object with its ratings
const retrieveRatingsIntoSubmission = (submission, config) => {
  return getSubmissionRatings(submission.id, config)
    .then(ratings => {
      return {
        ...submission,
        ratings
      }
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

// Fill all specified submissions objects with their ratings 
const retrieveRatingsIntoSubmissions = (submissions, config) => {
  return PromiseBb.map(
    submissions,
    submission => retrieveRatingsIntoSubmission(submission, config),
    { concurrency: MAX_CONCURRENT }
  )
  .catch(error => {
    console.log(error)
    throw error
  })
}

const getEvent = (config) => {
  return axios.get(`event`, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

const getApi = (cfpToken) => {
  const axiosConfig = getAxiosConfig(cfpToken)
  console.log({axiosConfig})
  return {
    getEvent: () => getEvent(axiosConfig),
    getSubmissions: (numberOfSubmissions) => getSubmissions(numberOfSubmissions, axiosConfig),
    getSubmissionFeedback: (submissionId) => getSubmissionFeedback(submissionId, axiosConfig),
    retrieveFeedbackIntoSubmission: (submission) => retrieveFeedbackIntoSubmission(submission, axiosConfig),
    retrieveFeedbackIntoSubmissions: (submissions) => retrieveFeedbackIntoSubmissions(submissions, axiosConfig),
    getSubmissionRatings: (submissionId) => getSubmissionRatings(submissionId, axiosConfig),
    retrieveRatingsIntoSubmission: (submission) => retrieveRatingsIntoSubmission(submission, axiosConfig),
    retrieveRatingsIntoSubmissions: (submissions) => retrieveRatingsIntoSubmissions(submissions, axiosConfig)
  }
}

module.exports = {
  getApi
}
