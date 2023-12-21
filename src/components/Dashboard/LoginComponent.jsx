import {useEffect} from 'preact/hooks'
import axios from 'axios'
import {progress, isLogin, url, token, user} from '../../state'

const Login = () => {
  const authenticate = () => {
    window.location.href = url.value
  }

  const geturlparams = name => {
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ''))
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        user.value.email = response.data.email
        user.value.id = response.data.id
        user.value.name = response.data.name
        user.value.picture = response.data.picture

        progress.value = 33
        isLogin.value = true
      } catch (error) {
        console.error('Error fetching user information:', error)
      }
    }

    if (window.location.search.indexOf('token') > -1) {
      token.value = geturlparams('token')
      localStorage.setItem('token', token.value)
      fetchUserInfo() // Fetch user information after successful authentication
    } else {
      axios.get('/.netlify/functions/google-auth').then(res => {
        url.value = res.data.redirectURL
        localStorage.setItem('url', url.value)
      })
    }
  }, [])

  return (
    <div className="card bg-base-300">
      <div className="card-body items-center text-center">
        <h1 className="card-title text-5xl font-bold">Hello there 👀</h1>

        <p className="py-2">Login with Google to start receiving notifications!</p>
        <p className="py-2">
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              <code className="font-mono font-medium text-sky-500 dark:text-primary">remind-us</code> may be flagged as
              unsafe, since it has not been verified by Google yet (bohot mehnat hai)
            </span>
          </div>{' '}
        </p>
        <figure className="px-4 sm:px-8 pt-6 sm:pt-8">
          <div className="overflow-x-auto border border-dashed border-accent">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="hidden sm:table-cell"></th>
                  <th>Scope</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th className="hidden sm:table-cell">1</th>
                  <td>
                    <code className="font-mono font-medium text-sky-500 dark:text-primary">userinfo.email</code>
                  </td>
                  <td>Access to email address.</td>
                </tr>

                <tr>
                  <th className="hidden sm:table-cell">2</th>
                  <td>
                    <code className="font-mono font-medium text-sky-500 dark:text-primary">userinfo.profile</code>
                  </td>
                  <td>Access to basic profile information.</td>
                </tr>

                <tr>
                  <th className="hidden sm:table-cell">3</th>
                  <td>
                    <code className="font-mono font-medium text-sky-500 dark:text-primary">calendar</code>
                  </td>
                  <td>Access to calendar data.</td>
                </tr>
                <tr>
                  <th className="hidden sm:table-cell">4</th>
                  <td>
                    <code className="font-mono font-medium text-sky-500 dark:text-primary">calendar.events</code>
                  </td>
                  <td>Access to calendar events.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>

        <div className="card-actions mt-10">
          <button className="btn btn-primary" onClick={authenticate}>
            Login Now
          </button>
        </div>
      </div>
    </div>
  )
}
export default Login
