<template>
  <button class="btn btn-sm action-btn"
    :class="{ 'btn-secondary': isFollowedOptimistic, 'btn-outline-secondary': !isFollowedOptimistic }"
    @click="handleFollow()">
    <i class="ion-plus-round"></i>
    <span v-if="isFollowedOptimistic">
      &nbsp; Unfollow {{ username }}
    </span>
    <span v-else>
      &nbsp; Follow {{ username }}
    </span>
  </button>
</template>

<script>
import { actionTypes } from '@/store/modules/followUser';

export default {
  data() {
    return {
      isFollowedOptimistic: this.author.following,
      username: this.author.username
    }
  },
  props: {
    author: {
      type: Object,
      required: true,
    }
  },
  methods: {
    handleFollow() {
      this.$store.dispatch(actionTypes.followUser, { username: this.username, isFollowed: this.isFollowedOptimistic });
      this.isFollowedOptimistic = !this.isFollowedOptimistic;
    }
  }
}
</script>
