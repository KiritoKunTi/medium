<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-view :apiURL="apiURL" />
        </div>
        <div class="col-md-3">
          POPULAR TAGS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedView from '@/components/FeedView.vue'

export default {
  components: {
    FeedView,
  },
  data() {
    return {
      apiURL: '/articles',
    }
  },
}
</script>