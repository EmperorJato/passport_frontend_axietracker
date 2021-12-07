export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + store.state.user.access_token
    }
  })

  $axios.onResponseError((err) => {
    const code = parseInt(err.response && err.response.status)
    if (code === 401) {
      sessionStorage.clear()
      redirect('/login')
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/error')
    }
  })
}
