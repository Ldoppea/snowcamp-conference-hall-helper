<template>
  <div class="author" v-show="filteredSubmissions.length > 0">
    <div class="author-header">
      <span><b>{{ authorData.speakerName }}</b> ({{authorData.submissions.length}} submissions)</span>
      <span class="feedback-indicator" v-if="aknowledgeFeedback && authorData.hasFeedback">received Feedback</span>
    </div>
    <submission v-for="submission in filteredSubmissions" :key="submission.id" :submissionData="submission" :showTags="showTags" :showLanguages="showLanguages"></submission>

    <div class="media-container" v-if="authorData.media && authorData.media.length > 0">
      <media v-for="media in authorData.media" :key="media.id" :url="media"></media>
    </div>
    <div class="no-media-container" v-if="(!authorData.media || (authorData.media && authorData.media.length == 0)) && authorData.noPreviousTalk">
      No talk found on web
    </div>

    <div class="warning-container" v-if="authorData.warnings && authorData.warnings.length > 0">
      <div v-for="warning in authorData.warnings" :key="warning.id">/!\ {{warning.value}}</div>
    </div>

    <div class="financial-container" v-if="showFinancial">
      <div v-if="authorData.financialOk.includes('Yes')" class="financial-ok">Is financial OK</div>
      <div v-if="authorData.financialOk.includes('No')" class="financial-nok">Is not financial OK</div>
      <div v-if="authorData.financialOk.includes('Maybe')" class="financial-maybe">Should be financial OK</div>
    </div>
  </div>
</template>

<script>
import Submission from '@/components/Submission'
import Media from '@/components/Media'

export default {
  name: 'author',
  props: {
    authorData: Object,
    aknowledgeFeedback: Boolean,
    showTags: Boolean,
    showLanguages: Boolean,
    showFinancial: Boolean
  },
  components: {
    Submission,
    Media
  },
  data () {
    return {
    }
  },
  computed: {
    filters () {
      return this.$store.getters.filterStatus
        .filter(filter => filter.value === true)
        .map(filter => filter.name)
    },
    filteredSubmissions () {
      return this.authorData.submissions.filter(submission => {
        return this.filters.includes(submission.status)
      })
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.author {
  position: relative;
  margin: 20px 5px 5px 5px;

  .author-header {
    border-top: 1px solid #8b8b8b;
    border-left: 1px solid #8b8b8b;
    border-right: 1px solid #8b8b8b;
    background: #eeeeee;
    padding: 5px 5px 5px 5px;

    .feedback-indicator {
      display: block;
      float: right;
    }
  }

  .media-container {
    background: #cccccc;
    border: 1px solid #8b8b8b;
    padding: 5px;
  }
  .no-media-container {
    background: #ba9797;
    border: 1px solid #8b8b8b;
    padding: 5px;
  }
  .warning-container {
    background: #ff0000;
    border: 1px solid #8b8b8b;
    padding: 5px;
    color: white;
  }
  .financial-ok,
  .financial-nok,
  .financial-maybe {
    border: 1px solid #8b8b8b;
    padding: 5px;
    color: white;
  }
  .financial-ok {
    background: green;
  }
  .financial-nok {
    background: red;
  }
  .financial-maybe {
    background: orange;
  }
}
</style>
