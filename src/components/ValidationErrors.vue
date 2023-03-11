<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    validationErrors: {
      type: Object,
      required: true,
    }
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.error-messages {
  margin-bottom: 40px;
  margin-left: 16px;
  font-size: 16px;

  li {
    color: #B85C5C;
    margin-left: 16px;

    font-weight: bold;
  }
}
</style>  