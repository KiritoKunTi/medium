<template>
  <div class="feed-wrap container">
    BANNER
    <div class="row">
      <div class="feed-col">
        <feed-view :apiURL="apiURL" />
      </div>
      <div class="tag-col">
        POPULAR TAGS
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

<style lang='scss' scoped>
.feed-wrap {
  .row {
    display: grid;
    grid-template-columns: auto 250px;

    .feed-col {
      border: 1px solid black;
    }

    .tag-col {
      border: 1px solid black;

    }
  }
}
</style>