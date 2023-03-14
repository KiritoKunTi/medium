<template>
  <fragment-loading v-if="isLoading" />
  <fragment-error v-if="error" />
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
import FragmentError from '@/components/FragmentError.vue';
import FragmentLoading from '@/components/FragmentLoading.vue';

export default {
  components: {
    FragmentError,
    FragmentLoading,
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