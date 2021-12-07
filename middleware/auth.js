export default function ({ store, redirect }) {
  if (!store.state.user.access_token) {
    return redirect('/login')
  }
}
