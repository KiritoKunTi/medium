<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <validation-errors v-if="errors" :validation-errors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Article Title" v-model="title">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="What's this article about?"
                  v-model="description">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" placeholder="Write your article(in markdown)"
                  v-model="body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Enter tags" v-model="tagList">
              </fieldset>
              <fieldset class="form-group">
                <button class="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from './ValidationErrors.vue'

export default {
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    }
  },
  components: {
    ValidationErrors,
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>