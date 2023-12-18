import {signal} from '@preact/signals'
import Login from '../../components/LoginComponent'

import {isLogin, progress} from '../../utils'
export function DashBoard() {
  return (
    <>
      <div className="navbar bg-base-300 text-center justify-center">
        <p className="text-3xl"></p>
        <progress className="progress progress-secondary w-[50%]" value={progress.value} max="100"></progress>
      </div>
      <div className="card">{!isLogin.value && <Login progress={progress} />}</div>
    </>
  )
}
