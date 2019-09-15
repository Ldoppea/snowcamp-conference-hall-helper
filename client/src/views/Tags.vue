<template>
  <div class="tags-view">
    <h1>Official Tags</h1>

    <div>
      <ul>
        <li v-for="tag in submissions" :key="tag.tag">
          {{tag.tag}} ({{tag.count}})
        </li>
      </ul>
    </div>

    <div v-for="tag in submissions" :key="tag.tag" class="tag-container">
      <div :class="tag.isBad ? 'bad-tag-title' : 'tag-title'">{{tag.tag}} ({{tag.count}} submissions)</div>
      <author v-for="author in tag.submissions" :key="tag + '_' + author.speakerName" :authorData="author" showTags></author>
    </div>
  </div>
</template>

<script>
import submissionsHelpers from '@/helpers/submissions-helpers'
import Submission from '@/components/Submission'
import Author from '@/components/Author'

export default {
  name: 'tags',
  components: {
    Submission,
    Author
  },
  data () {
    return {
    }
  },
  computed: {
    eventTags () {
      return this.$store.getters.event.cfp.tags.filter(tag => {
        return tag !== 'English' && tag !== 'French'
      })
    },
    submissions () {
      return this.getSubmissionsByTags()
    },
    submissionsWithNoTag () {
      return this.getSubmissionsWithNoTags()
    }
  },
  mounted () {
  },
  methods: {
    getSubmissionsByTags () {
      const submissions = this.$store.getters.submissions

      const submissionsLight = submissions
        .map(submissionsHelpers.submissionToSubmissionLight)

      let submissionsByTags = this.eventTags.map(tag => {
        const submissionsForTag = submissionsLight.filter(submission => {
          return submission.tags.includes(tag)
        })

        const submissionsByAuthor = submissionsHelpers.groupByAuthors(submissionsForTag)

        return {
          tag,
          count: submissionsForTag.length,
          submissions: submissionsByAuthor
        }
      })

      return [
        this.getSubmissionsWithNoTags(),
        ...submissionsByTags
      ]
    },
    getSubmissionsWithNoTags () {
      const submissions = this.$store.getters.submissions

      const submissionsLight = submissions
        .map(submissionsHelpers.submissionToSubmissionLight)

      const submissionsWithNoTag = submissionsLight.filter(submission => {
        return this.eventTags.map(tag => {
          return submission.tags.includes(tag)
        }).every(result => result === false)
      })

      const submissionsByAuthor = submissionsHelpers.groupByAuthors(submissionsWithNoTag)

      return {
        tag: 'Missing official tag',
        isBad: true,
        count: submissionsWithNoTag.length,
        submissions: submissionsByAuthor
      }
    },
    countSubmissionsByLanguage (languageFilter) {
      return this.$store.getters.submissions
        .filter(languageFilter)
        .length
    }
  }
}
</script>

<style lang="scss">
.tag-title,
.bad-tag-title {
  position: relative;
  margin: 20px 5px 5px 5px;
  background: #cfe8ff;
  font-size: 25px;
  padding: 5px 5px 5px 15px;
}
.bad-tag-title {
  background: red;
}
</style>
