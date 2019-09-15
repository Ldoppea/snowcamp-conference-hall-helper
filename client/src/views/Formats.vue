<template>
  <div class="formats-view">
    <h1>Formats</h1>

    <div>
      <ul>
        <li v-for="format in submissions" :key="format.format">
          {{format.format}} ({{format.count}})
        </li>
      </ul>
    </div>

    <div v-for="format in submissions" :key="format.format" class="format-container">
      <div :class="format.isBad ? 'bad-format-title' : 'format-title'">{{format.format}} ({{format.count}} submissions)</div>
      <author v-for="author in format.submissions" :key="format + '_' + author.speakerName" :authorData="author"></author>
    </div>
  </div>
</template>

<script>
import submissionsHelpers from '@/helpers/submissions-helpers'
import Submission from '@/components/Submission'
import Author from '@/components/Author'

export default {
  name: 'formats',
  components: {
    Submission,
    Author
  },
  data () {
    return {
    }
  },
  computed: {
    eventFormats () {
      return this.$store.getters.event.formats.map(format => {
        return format.name
      })
    },
    submissions () {
      return this.getSubmissionsByFormats()
    },
    submissionsWithNoFormat () {
      return this.getSubmissionsWithNoFormats()
    }
  },
  mounted () {
  },
  methods: {
    getSubmissionsByFormats () {
      const submissions = this.$store.getters.submissions

      const submissionsLight = submissions
        .map(submissionsHelpers.submissionToSubmissionLight)

      let submissionsByFormats = this.eventFormats.map(format => {
        const submissionsForFormat = submissionsLight.filter(submission => {
          return submission.format.includes(format)
        })

        const submissionsByAuthor = submissionsHelpers.groupByAuthors(submissionsForFormat)

        return {
          format,
          count: submissionsForFormat.length,
          submissions: submissionsByAuthor
        }
      })

      return [
        this.getSubmissionsWithNoFormats(),
        ...submissionsByFormats
      ]
    },
    getSubmissionsWithNoFormats () {
      const submissions = this.$store.getters.submissions

      const submissionsLight = submissions
        .map(submissionsHelpers.submissionToSubmissionLight)

      const submissionsWithNoFormat = submissionsLight.filter(submission => {
        return this.eventFormats.map(format => {
          return submission.format.includes(format)
        }).every(result => result === false)
      })

      const submissionsByAuthor = submissionsHelpers.groupByAuthors(submissionsWithNoFormat)

      return {
        format: 'Missing format',
        isBad: true,
        count: submissionsWithNoFormat.length,
        submissions: submissionsByAuthor
      }
    }
  }
}
</script>

<style lang="scss">
.format-title,
.bad-format-title {
  position: relative;
  margin: 20px 5px 5px 5px;
  background: #cfe8ff;
  font-size: 25px;
  padding: 5px 5px 5px 15px;
}
.bad-format-title {
  background: red;
}
</style>
