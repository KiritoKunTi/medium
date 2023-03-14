<template>
  <div class="home-page">
    <banner-view />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler />
          <feed-view :apiURL="apiURL" />
        </div>
        <div class="col-md-3">
          <popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedView from '@/components/FeedView.vue'
import PopularTags from '@/components/PopularTags.vue'
import BannerView from '@/components/BannerView.vue'
import FeedToggler from '@/components/FeedToggler.vue'

export default {
  components: {
    FeedView,
    PopularTags,
    BannerView,
    FeedToggler,
  },
  data() {
    return {
      apiURL: '/articles',
    }
  },
}
</script>