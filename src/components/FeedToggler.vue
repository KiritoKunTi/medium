<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link :class="{ active: routeName === 'yourFeed' }" :to="{ name: 'yourFeed' }" class="nav-link">Your
          Feed</router-link>
      </li>
      <li class="nav-item">
        <router-link :class="{ active: routeName === 'globalFeed' }" :to="{ name: 'globalFeed' }" class="nav-link">Global
          Feed</router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link :class="{ active: routeName === 'tag' }" :to="{ name: 'tag' }" class="nav-link">
          <i class="ion-pound" />

          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    routeName() {
      return this.$route.name
    }
  }
}
</script>