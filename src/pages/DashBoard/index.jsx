import {signal} from '@preact/signals'
import Login from '../../components/LoginComponent'
import BirthdayComponent from '../../components/BirthdayComponent'

import {isLogin, progress} from '../../state'
export function DashBoard() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{backgroundImage: 'url(https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg)'}}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div className="text-center shadow-xl shadow-base-300">
          <div className="py-4 bg-base-300 text-center justify-center">
            <p className="text-3xl"></p>
            <progress className="progress progress-secondary w-[50%]" value={progress.value} max="100"></progress>
            {!isLogin.value && <Login />}
            {isLogin.value && <BirthdayComponent />}
          </div>
        </div>
      </div>
    </>
  )
}
