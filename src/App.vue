<template>
  <router-view />
</template>

<script>
import { actionTypes } from '@/store/modules/auth';

export default {
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  }
}
</script>
