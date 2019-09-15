<template>
  <div class="submission" :class="[submissionData.isConference ? 'conference' : '', submissionData.isUniversity ? 'university' : '', !submissionData.isConference && !submissionData.isUniversity ? 'noformat' : '', filterByEmail && hasBeenRated ? 'rated-submission' : '', 'status-' + submissionData.status]">
    <div class="rating">
      <span class="rating-label">Your rating </span>
      <div class="rating-stars">
        <star-rating v-if="hasBeenRated" :rating="userRating" :increment="0.01" :fixed-points="2" :star-size="20" :show-rating="false" read-only></star-rating>
      </div>
    </div>
    <a class="submission-link" :href="'https://conference-hall.io/organizer/event/mB6d6o0uQONgUiFuo9We/proposal/' + submissionData.id">{{submissionData.talkName}}</a>
    <span class="submission-format"> : {{submissionData.isConference ? 'Talk' : ''}}{{submissionData.isUniversity ? 'Workshop' : ''}}{{!submissionData.isConference && !submissionData.isUniversity ? 'NoFormat' : ''}}</span>
    <span class="submission-status"> - {{submissionData.status}}</span>
    <div class="languages" v-if="showLanguages && submissionData.languages !== undefined && submissionData.languages.length > 0">
      <span v-for="language in submissionData.languages" :key="language" :class="'language-' + language" >
        {{language}}
      </span>
    </div>
    <div class="languages" v-else-if="showLanguages">
      <span class="language-undefined" >NO LANGUAGE SET</span>
    </div>
    <div class="tags" v-if="showTags">
      <span v-for="tag in submissionData.tags" :key="tag" :class="'tag tag-' + tag" >
        {{tag}}
      </span>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'submission',
  props: {
    submissionData: Object,
    showTags: Boolean,
    showLanguages: Boolean
  },
  components: {
    StarRating
  },
  data () {
    return {
    }
  },
  computed: {
    filterByEmail () {
      return this.$store.getters.filterByEmail
    },
    hasBeenRated () {
      return this.submissionData.ratings.some(rating => rating.user.email === this.$store.getters.cfpEmail)
    },
    userRating () {
      let ratingValue = 0
      const ratingString = this.submissionData.ratings.find(rating => rating.user.email === this.$store.getters.cfpEmail)

      if (ratingString) {
        ratingValue = parseFloat(ratingString.value)
      }

      return ratingValue / 20
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.submission {
  position: relative;

  padding: 5px;

  border: 1px solid #8b8b8b;
  background: #cccccc;

  .languages {
    position: relative;
    float: right;

    .language-French {
      background: #82c3ff;
    }

    .language-English {
      background: #dfffa3;
    }

    .language-undefined {
      background: red;
    }
  }

  .tags {
    margin-top: 5px;
    .tag {
      background: #cfe8ff;
      margin-right: 10px;
    }
  }
}
.university .submission-format {
  color: #fffb00;
}
.conference .submission-format {
  color: #008bff;
}
.noformat .submission-format {
  color: #ff0000;
}
.status-submitted .submission-status {
  color: grey;
}
.status-accepted .submission-status {
  color: green;
}
.status-rejected .submission-status {
  color: red;
}
.status-waitlist .submission-status {
  color: orange;
}

.rated-submission a {
  opacity: 0.2;
}

.rating {
  float: right;

  .rating-label {
    font-size: 10px;
    color: grey;
  }

  .rating-stars {
    display: inline-block;
  }
}
</style>
