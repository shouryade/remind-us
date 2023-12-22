import Login from '../../components/Dashboard/LoginComponent'
import BirthdayComponent from '../../components/Dashboard/BirthdayComponent'
import SelectFriends from '../../components/Dashboard/SelectFriends'

import {isLogin, progress, HasBirthdaySet, SelectedFriends} from '../../state'
import WellDone from '../../components/Dashboard/Finish'

export function DashBoard() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{backgroundImage: 'url(https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg)'}}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div className="text-center shadow-xl shadow-base-300">
          <div className="py-4 bg-base-300 text-center justify-center min-w-[320px] md:min-w-[600px] lg:min-w-[830px] min-h-[610px]">
            <p className="text-3xl py-3">
              <progress className="progress progress-secondary w-[50%]" value={progress.value} max="100"></progress>
            </p>
            {!isLogin.value && <Login />}
            {!HasBirthdaySet.value && isLogin.value && <BirthdayComponent />}
            {!SelectedFriends.value && HasBirthdaySet.value && isLogin.value && <SelectFriends />}
            {SelectedFriends.value && HasBirthdaySet.value && isLogin.value && <WellDone />}
          </div>
        </div>
      </div>
    </>
  )
}
