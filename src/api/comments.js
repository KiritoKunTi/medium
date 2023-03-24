import axios from '@/api/axios'

const getUrl = slug => {
  return `/articles/${slug}/comments`
}

const getComments = slug => {
  const url = getUrl(slug)
  return axios.get(url).then(response => response.data.comments)
}

const addComment = (slug, commentBody) => {
  const url = getUrl(slug)
  const body = {body: commentBody}
  return axios.post(url, {comment: body}).then(response => response.data.comments)
}

const deleteComment = (slug, commentId) => {
  const url = getUrl(slug)
  return axios.delete(`${url}/${commentId}`, {id: commentId})
}

export default {
  getComments,
  addComment,
  deleteComment,
}