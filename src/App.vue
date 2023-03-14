<template>
  <header-view />
  <router-view />
</template>

<script>
import HeaderView from '@/components/TheHeader.vue'
import { actionTypes } from '@/store/modules/auth';

export default {
  components: {
    HeaderView,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  }
}
</script>
