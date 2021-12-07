export default function ({ route, redirect }) {
  if (!route.query.token) {
    return redirect('/login')
  }
}
