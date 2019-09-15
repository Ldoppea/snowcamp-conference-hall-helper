import groupBy from '@/helpers/group-by'

const languageTagFilter = (tag) => {
  return tag === 'French' || tag === 'English'
}

const includeFrench = (languageStr) => {
  const language = languageStr.toLowerCase()
  return language.includes('french') || language.includes('français') || language.includes('francais') || language.includes('france')
}

const includeEnglish = (languageStr) => {
  const language = languageStr.toLowerCase()
  return language.includes('english') || language.includes('anglais')
}

const isFrenchSubmission = (submission) => {
  return includeFrench(submission.language) && !includeEnglish(submission.language)
}

const isEnglishSubmission = (submission) => {
  return includeEnglish(submission.language) && !includeFrench(submission.language)
}

const isBothLanguagesSubmission = (submission) => {
  return includeEnglish(submission.language) && includeFrench(submission.language)
}

const isNoLanguageSubmission = (submission) => {
  return !includeEnglish(submission.language) && !includeFrench(submission.language)
}

const isWorkshopSubmission = (submission) => {
  return submission.talk.talk_format.startsWith('University')
}

const isTalkSubmission = (submission) => {
  return submission.talk.talk_format.startsWith('Talk')
}

const groupByAuthors = (submissions) => {
  const groupedSubmissions = groupBy(submissions, 'speakerName')

  const submissionsByAuthor = Object.keys(groupedSubmissions).map(function (key) {
    const authorSumissions = groupedSubmissions[key]
    return {
      speakerName: key,
      speakerLocation: authorSumissions[0].speakerLocation,
      hasFeedback: authorSumissions.some(submission => submission.feedbacks !== undefined && submission.feedbacks.length > 0),
      submissions: authorSumissions
    }
  })

  return submissionsByAuthor
}

const getLanguages = (languages) => {
  return [
    includeFrench(languages) ? 'French' : undefined,
    includeEnglish(languages) ? 'English' : undefined
  ]
}

const submissionToSubmissionLight = (submission) => {
  return {
    id: submission.id,
    speakerName: submission.profile.name,
    speakerLocation: submission.profile.location,
    talkName: submission.talk.title,
    tags: submission.tags,
    languages: getLanguages(submission.language),
    feedbacks: submission.feedback.map(feedback => {
      return {
        user: feedback.user.name,
        body: feedback.body,
        creationDate: feedback.created_at
      }
    }),
    ratings: submission.ratings,
    isConference: submission.talk.talk_format.startsWith('Talk'),
    isUniversity: submission.talk.talk_format.startsWith('Workshop'),
    format: submission.talk.talk_format,
    status: submission.state
  }
}

const getSubmissionsTagContent = (submissions, tagName) => {
  return submissions.flatMap(submission => submission.ratings)
    .flatMap(rating => rating.comments.split('\r\n'))
    .filter(commentLine => commentLine.startsWith(`${tagName}: `))
    .map(commentLine => commentLine.replace(`${tagName}: `, ''))
}

const getSubmissionsTagPresence = (submissions, tagName) => {
  return submissions.flatMap(submission => submission.ratings)
    .flatMap(rating => rating.comments.split('\r\n'))
    .some(commentLine => commentLine.startsWith(tagName))
}

export default {
  languageTagFilter,
  isFrenchSubmission,
  isEnglishSubmission,
  isBothLanguagesSubmission,
  isNoLanguageSubmission,
  groupByAuthors,
  submissionToSubmissionLight,
  isWorkshopSubmission,
  isTalkSubmission,
  getSubmissionsTagContent,
  getSubmissionsTagPresence
}
