import axios from 'axios'

const getUrl = (slug) => `/articles/${slug}/favorite`

const like = (articleSlug) => {
  const url = getUrl(articleSlug)
  return axios.post(url).then((response) => response.data.article)
}

const dislike = (articleSlug) => {
  const url = getUrl(articleSlug)
  return axios.delete(url).then((response) => response.data.article)
}

export default {
  like,
  dislike,
}
