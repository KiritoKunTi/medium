import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
}

export const mutationTypes = {
  editArticleStart: '[editArticle] edit article start',
  editArticleSuccess: '[editArticle] edit article success',
  editArticleFailure: '[editArticle] edit article failure',

  getArticleStart: '[editArticle] get article start',
  getArticleSuccess: '[editArticle] get article success',
  getArticleFailure: '[editArticle] get article failure',
}

export const actionTypes = {
  editArticle: '[editArticle] edit article',
  getArticle: '[editArticle] get article',
}

const mutations = {
  // UPDATE ARTICLE
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true;
    state.article = null;
  },
  [mutationTypes.editArticleSuccess](state) {
    state.validationErrors = null;
    state.isSubmitting = false;
  },
  [mutationTypes.editArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  // GET ARTICLE
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) { 
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
}

const actions = {
  [actionTypes.editArticle](context, {slug, articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then(article => {
          context.commit(mutationTypes.editArticleSuccess, article)
          resolve(article)
        })
        .catch(result => {
          context.commit(mutationTypes.editArticleFailure, result.response.data.errors)
        })
    })
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}