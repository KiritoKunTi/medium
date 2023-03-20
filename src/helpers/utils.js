export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start)
}

export const clearList = (array) => {
  return array.filter((item) => item.length > 0)
}
