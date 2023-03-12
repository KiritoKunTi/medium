<template>
  <header-view />
  <router-view />
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'

export default {
  components: {
    HeaderView,
  },
}
</script>
