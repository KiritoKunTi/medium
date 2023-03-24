<template>
<div class="card">
  <div class="card-block">
    <p class="card-text">{{ comment.body }}</p>
  </div>
  <div class="card-footer">
    <router-link class="comment-author" :to="{name: 'userProfile', params: {slug: comment.author.username}}">
        <img :src="comment.author.image" class="comment-author-img">
    </router-link>
    &nbsp;
    <router-link class="comment-author" :to="{name: 'userProfile', params: {slug: comment.author.username}}">
        {{ comment.author.username }}
    </router-link>
    <span class="date-posted">{{ $filters.dateToString(comment.createdAt) }}</span>
    <span class="mod-options" v-if="currentUser.username === comment.author.username">
      <i class="ion-trash-a" @click="this.$emit('handleDelete', comment.id)"></i>
    </span>
  </div>
</div>
</template>

<script>
import { getterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    methods: {
    },
    computed: {
        ...mapGetters({
            currentUser: getterTypes.currentUser,
        }),
    }
}
</script>