<template>
  <div class="home-page">
    <banner-view />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler :tag-name="tagName" />
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
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiURL() {
      return `/articles?tag=${this.tagName}`;
    }
  }
}
</script>