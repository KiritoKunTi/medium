<template>
    <header-view />
    <router-view />
</template>
  
<script>
import HeaderView from '@/components/TheHeader.vue'
  
export default {
    components: {
        HeaderView,
    },    
}
</script>
  