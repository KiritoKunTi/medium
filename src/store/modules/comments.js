import commentsApi from "@/api/comments"

const state = {
  data: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
}

export const mutationTypes = {
  // GET Comments
  getCommentsStart: '[comments] getCommentsStart',
  getCommentsSuccess: '[comments] getCommentsSuccess',
  getCommentsFailure: '[comments] getCommentsFailure', 
  // add Comments
  addCommentStart: '[comments] addCommentStart',
  addCommentSuccess: '[comments] addCommentSuccess',
  addCommentFailure: '[comments] addCommentFailure', 
  // DELETE Comments
  deleteCommentStart: '[comments] deleteCommentStart',
  deleteCommentSuccess: '[comments] deleteCommentSuccess',
  deleteCommentFailure: '[comments] deleteCommentFailure', 
}

export const actionTypes = {
  getComments: '[comments] getComments',
  addComment: '[comments] addComment',
  deleteComment: '[comments] deleteComment'
}

const mutations = {
  // GET ARTICLE 
  [mutationTypes.getCommentsStart](state) {
    state.isLoading = true;
    // state.data = null; 
  },
  [mutationTypes.getCommentsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getCommentsFailure](state) {
    state.isLoading = false;
  },
  // add ARTICLE
  [mutationTypes.addCommentStart](state) {
    state.isSubmitting = true
    state.error = null
  },
  [mutationTypes.addCommentSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.addCommentFailure](state, payload) {
    state.isSubmitting = false
    state.error = payload
  },
  // DELETE ARTICLE
  [mutationTypes.deleteCommentStart]() {},
  [mutationTypes.deleteCommentSuccess]() {},
  [mutationTypes.deleteCommentFailure]() {},
}

const actions = {
  [actionTypes.getComments](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCommentsStart);
      commentsApi
        .getComments(slug)
        .then(response => {
          context.commit(mutationTypes.getCommentsSuccess, response)
          resolve(response)
        }) 
        .catch(() => {
          context.commit(mutationTypes.getCommentsFailure)
        })   
    })
  },
  [actionTypes.addComment](context, {slug, commentBody}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addCommentStart);
      commentsApi
        .addComment(slug, commentBody)
        .then(response => {
          context.commit(mutationTypes.addCommentSuccess)
          resolve(response);
        }) 
        .catch(result => {
          context.commit(mutationTypes.addCommentFailure, result)
        })   
    })
  },
  [actionTypes.deleteComment](context, {slug, commentId}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteCommentStart);
      commentsApi
        .deleteComment(slug, commentId)
        .then(() => {
          context.commit(mutationTypes.deleteCommentSuccess)
          resolve();
        }) 
        .catch(() => {
          context.commit(mutationTypes.deleteCommentFailure)
        })   
    })
  } 
}

export default {
  state,
  mutations,
  actions,
}