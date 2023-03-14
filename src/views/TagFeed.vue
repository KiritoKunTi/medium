<template>
  <div class="home-page">
    <banner-view />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
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

export default {
  components: {
    FeedView,
    PopularTags,
    BannerView,
  },
  computed: {
    apiURL() {
      const tagName = this.$route.params.slug;
      return `/articles?tag=${tagName}`;
    }
  }
}
</script>