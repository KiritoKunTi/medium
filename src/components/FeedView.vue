<template>
  <div v-if="isLoading">isLoading...</div>
  <div v-if="error">Something went wrong</div>
  <!-- <div v-if="feed">
    <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
      <div class="article-meta">
        <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
          <img :src="article.author.image" alt="author">
        </router-link>
        <div class="info">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            {{ article.author.username }}
          </router-link>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { actionTypes } from '@/store/modules/feed';
import { mapState } from 'vuex';

export default {
  props: {
    apiURL: {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, { apiURL: this.apiURL })
  }
}
</script>

<style lang='scss' scoped></style>