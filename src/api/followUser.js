import axios from 'axios'

const getUrl = (slug) => {
  return `/profiles/${slug}/follow`
}

const follow = (username) => {
  const url = getUrl(username)
  return axios.post(url).then((response) => response.data.author)
}

const unfollow = (username) => {
  const url = getUrl(username)
  return axios.delete(url).then((response) => response.data.author)
}

export default {
  follow,
  unfollow,
}
