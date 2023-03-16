import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const mutationTypes = {
  createArticleStart: '[createArticle] create article start',
  createArticleSuccess: '[createArticle] create article success',
  createArticleFailure: '[createArticle] create article failure',
}

export const actionTypes = {
  createArticle: '[createArticle] create article',
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
    state.validationErrors = null;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  }
}

const actions = {
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createArticleStart);
      articleApi
        .createArticle(articleInput)
        .then(article => {
          context.commit(mutationTypes.createArticleSuccess)
          resolve(article)
        })
        .catch(result => {
          context.commit(mutationTypes.createArticleFailure, result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
}