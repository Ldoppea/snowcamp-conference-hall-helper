<template>
  <div class="travelers-view">
    <h1>Travelers</h1>

    <h2 v-if="mustTravel.length > 0">UNKNOWN - {{maybeNeedToTravel.length}}</h2>
    <author v-for="author in maybeNeedToTravel" :key="'maybeNeedToTravel' +author.speakerName" :authorData="author" aknowledgeFeedback showFinancial></author>

    <h2 v-if="mustTravel.length > 0">MUST TRAVEL - {{mustTravel.length}}</h2>
    <author v-for="author in mustTravel" :key="'mustTravel' +author.speakerName" :authorData="author" aknowledgeFeedback showFinancial></author>
  </div>
</template>

<script>
import submissionsHelpers from '@/helpers/submissions-helpers'
import Author from '@/components/Author'

export default {
  name: 'travelers',
  components: {
    Author
  },
  data () {
    return {
    }
  },
  computed: {
    submissionsByAuthor () {
      const submissions = this.$store.getters.submissions

      const submissionsLight = submissions
        .map(submissionsHelpers.submissionToSubmissionLight)

      const submissionsByAuthor = submissionsHelpers.groupByAuthors(submissionsLight)
        .map(author => {
          return {
            ...author,
            country: submissionsHelpers.getSubmissionsTagContent(author.submissions, 'Country'),
            financialOk: submissionsHelpers.getSubmissionsTagContent(author.submissions, 'FinancialOk')
          }
        })

      return submissionsByAuthor
    },
    mustTravel () {
      return this.submissionsByAuthor.filter(author => author.country.includes('Alien'))
    },
    noNeedToTravel () {
      return this.submissionsByAuthor.filter(author => author.country.includes('France'))
    },
    maybeNeedToTravel () {
      return this.submissionsByAuthor.filter(author => author.country.length === 0)
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
