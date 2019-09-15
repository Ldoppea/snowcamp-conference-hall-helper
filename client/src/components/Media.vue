<template>
  <div class="media">
    <iframe width="200" height="112" :src="embedUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  name: 'media',
  props: {
    url: String
  },
  data () {
    return {
    }
  },
  computed: {
    embedUrl () {
      return this.url
        .replace('https://www.youtube.com/', 'https://www.youtube.com/embed/')
        .replace('https://youtu.be/', 'https://www.youtube.com/embed/')
        .replace('https://vimeo.com/', 'https://player.vimeo.com/video/')
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.media {
  display: inline-block;
  margin-right: 5px;
}
</style>
