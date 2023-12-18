import {Component} from 'preact'
import axios from 'axios'

import {progress, isLogin} from '../utils'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      url: null,
      token: null,
    }
  }

  authenticate() {
    window.location.href = this.state.url
    progress.value = 33
  }

  geturlparams(name) {
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ''))
  }

  componentDidMount() {
    if (window.location.search.indexOf('token') > -1) {
      this.setState({
        token: this.geturlparams('token'),
      })
    } else {
      axios.get('/.netlify/functions/google-auth').then(res => {
        this.setState({
          url: res.data.redirectURL,
        })
      })
    }
  }

  render() {
    return (
      <div className="card w-responsive bg-base-300 shadow-xl">
        <div className="card-body items-center text-center ">
          <h1 className="card-title text-5xl font-bold">Hello there 👀</h1>

          <p className="py-3">Login with Google to start recieving notifications!</p>
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
                <code className="font-mono font-medium text-sky-500 dark:text-primary">remind-us</code> may be flagged
                as unsafe, since it has not been verified by Google yet (bohot mehnat hai)
              </span>
            </div>{' '}
          </p>
          <figure className="px-10 pt-10 py-6">
            <div className="overflow-x-auto border border-dashed border-accent">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Scope</th>
                    <th>Description</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>1</th>
                    <td>
                      <code className="font-mono font-medium text-sky-500 dark:text-primary">userinfo.email</code>
                    </td>
                    <td>Access to email address.</td>
                  </tr>

                  <tr>
                    <th>2</th>
                    <td>
                      <code className="font-mono font-medium text-sky-500 dark:text-primary">userinfo.profile</code>
                    </td>
                    <td>Access to basic profile information.</td>
                  </tr>

                  <tr>
                    <th>3</th>
                    <td>
                      <code className="font-mono font-medium text-sky-500 dark:text-primary">calendar</code>
                    </td>
                    <td>Access to calendar data.</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>
                      <code className="font-mono font-medium text-sky-500 dark:text-primary">calendar.events</code>
                    </td>
                    <td>Access to calendar events.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => (progress.value = 33)}>
              Login Now
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
