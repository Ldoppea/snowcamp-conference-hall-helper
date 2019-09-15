<template>
  <div class="authors-view">
    <h1>Authors</h1>

    <author v-for="author in submissionsByAuthor"
      :key="author.speakerName"
      :authorData="author"
      aknowledgeFeedback>
    </author>
  </div>
</template>

<script>
import submissionsHelpers from '@/helpers/submissions-helpers'
import Author from '@/components/Author'

export default {
  name: 'authors',
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
            media: submissionsHelpers.getSubmissionsTagContent(author.submissions, 'PreviousTalk'),
            noPreviousTalk: submissionsHelpers.getSubmissionsTagPresence(author.submissions, 'NoPreviousTalk'),
            warnings: submissionsHelpers.getSubmissionsTagContent(author.submissions, 'Warning')
              .map((warning, index) => {
                return {
                  id: index,
                  value: warning
                }
              })
          }
        })

      return submissionsByAuthor
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
