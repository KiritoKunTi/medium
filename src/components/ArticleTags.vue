<template>
  <ul class="tag-list">
    <li v-for="(tag, index) in tagList" :key="index" class="tag-default tag-pill tag-outline">
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
      required: true,
    }
  }
}
</script>
