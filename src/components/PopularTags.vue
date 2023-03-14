<template>
  <div v-if="isLoading">...Loading</div>
  <div v-if="error">Somethings went wrong</div>
  <div class="sidebar" v-if="popularTags">
    <p>Popular tags</p>
    <div class="tag-list">
      <router-link class="tag-default tag-pill" v-for="tag in popularTags" :key="tag"
        :to="{ name: 'tag', params: { slug: tag } }">
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/popularTags';
import { mapState } from 'vuex';

export default {
  props: {
    apiURL: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      error: state => state.popularTags.error,
      popularTags: state => state.popularTags.data,
    })
  },
}
</script>

<style lang='scss' scoped></style>