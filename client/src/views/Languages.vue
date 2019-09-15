<template>
  <div class="languages-view">
    <h1>All</h1>

    <div>
      <ul>
        <li>NO LANGUAGE SET - {{numberOfNoneSubmissions}}</li>
        <li>French - {{numberOfFrenchSubmissions}}</li>
        <li>English - {{numberOfEnglishSubmissions}}</li>
        <li>French or English - {{numberOfBothSubmissions}}</li>
      </ul>
    </div>

    <h1>Workshops</h1>

    <div>
      <ul>
        <li>NO LANGUAGE SET - {{numberOfNoneSubmissionsWorkshop}}</li>
        <li>French - {{numberOfFrenchSubmissionsWorkshop}}</li>
        <li>English - {{numberOfEnglishSubmissionsWorkshop}}</li>
        <li>French or English - {{numberOfBothSubmissionsWorkshop}}</li>
      </ul>
    </div>

    <h1>Talks</h1>

    <div>
      <ul>
        <li>NO LANGUAGE SET - {{numberOfNoneSubmissionsTalk}}</li>
        <li>French - {{numberOfFrenchSubmissionsTalk}}</li>
        <li>English - {{numberOfEnglishSubmissionsTalk}}</li>
        <li>French or English - {{numberOfBothSubmissionsTalk}}</li>
      </ul>
    </div>

    <h2 v-if="submissionsNone.length > 0">NO LANGUAGE SET - {{numberOfNoneSubmissions}}</h2>
    <author v-for="author in submissionsNone" :key="'none' +author.speakerName" :authorData="author" showLanguages></author>

    <h2>French - {{numberOfFrenchSubmissions}}</h2>
    <author v-for="author in submissionsFrench" :key="'french' +author.speakerName" :authorData="author" showLanguages></author>

    <h2>English - {{numberOfEnglishSubmissions}}</h2>
    <author v-for="author in submissionsEnglish" :key="'english' +author.speakerName" :authorData="author" showLanguages></author>

    <h2 v-if="submissionsBoth.length > 0">French or English - {{numberOfBothSubmissions}}</h2>
    <author v-for="author in submissionsBoth" :key="'both' +author.speakerName" :authorData="author" showLanguages></author>
  </div>
</template>

<script>
import submissionsHelpers from '@/helpers/submissions-helpers'
import Submission from '@/components/Submission'
import Author from '@/components/Author'

export default {
  name: 'languages',
  components: {
    Submission,
    Author
  },
  data () {
    return {
    }
  },
  computed: {
    numberOfFrenchSubmissions () {
      return this.countSubmissionsByLanguage(submissionsHelpers.isFrenchSubmission)
    },
    numberOfEnglishSubmissions () {
      return this.countSubmissionsByLanguage(submissionsHelpers.isEnglishSubmission)
    },
    numberOfNoneSubmissions () {
      return this.countSubmissionsByLanguage(submissionsHelpers.isNoLanguageSubmission)
    },
    numberOfBothSubmissions () {
      return this.countSubmissionsByLanguage(submissionsHelpers.isBothLanguagesSubmission)
    },
    submissionsFrench () {
      return this.getSubmissionsByLanguage(submissionsHelpers.isFrenchSubmission)
    },
    submissionsEnglish () {
      return this.getSubmissionsByLanguage(submissionsHelpers.isEnglishSubmission)
    },
    submissionsBoth () {
      return this.getSubmissionsByLanguage(submissionsHelpers.isBothLanguagesSubmission)
    },
    submissionsNone () {
      return this.getSubmissionsByLanguage(submissionsHelpers.isNoLanguageSubmission)
    },

    numberOfFrenchSubmissionsWorkshop () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isWorkshopSubmission, submissionsHelpers.isFrenchSubmission)
    },
    numberOfEnglishSubmissionsWorkshop () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isWorkshopSubmission, submissionsHelpers.isEnglishSubmission)
    },
    numberOfNoneSubmissionsWorkshop () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isWorkshopSubmission, submissionsHelpers.isNoLanguageSubmission)
    },
    numberOfBothSubmissionsWorkshop () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isWorkshopSubmission, submissionsHelpers.isBothLanguagesSubmission)
    },

    numberOfFrenchSubmissionsTalk () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isTalkSubmission, submissionsHelpers.isFrenchSubmission)
    },
    numberOfEnglishSubmissionsTalk () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isTalkSubmission, submissionsHelpers.isEnglishSubmission)
    },
    numberOfNoneSubmissionsTalk () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isTalkSubmission, submissionsHelpers.isNoLanguageSubmission)
    },
    numberOfBothSubmissionsTalk () {
      return this.countSubmissionsByTypeAndLanguage(submissionsHelpers.isTalkSubmission, submissionsHelpers.isBothLanguagesSubmission)
    }
  },
  mounted () {
  },
  methods: {
    getSubmissionsByLanguage (languageFilter) {
      const submissions = this.$store.getters.submissions

      const submissionsLight = submissions
        .filter(languageFilter)
        .map(submissionsHelpers.submissionToSubmissionLight)

      const submissionsByAuthor = submissionsHelpers.groupByAuthors(submissionsLight)

      return submissionsByAuthor
    },
    countSubmissionsByLanguage (languageFilter) {
      return this.$store.getters.submissions
        .filter(languageFilter)
        .length
    },
    countSubmissionsByTypeAndLanguage (typeFilter, languageFilter) {
      return this.$store.getters.submissions
        .filter(typeFilter)
        .filter(languageFilter)
        .length
    }
  }
}
</script>
