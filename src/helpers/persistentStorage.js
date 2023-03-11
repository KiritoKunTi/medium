export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch(e) {
    console.log('Error while getting data from localstorage', e.message);
    return null
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))    
  } catch(e) {
    console.log('Error while setting data to localstorage', e.message);
  }
}