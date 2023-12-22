import {useEffect} from 'preact/hooks'
import {signal} from '@preact/signals'
import {progress, clearState} from '../../state'
import {useLocation} from 'preact-iso'

const WellDone = () => {
  const location = useLocation()
  progress.value = 100
  const calculateTimeLeft = () => {
    // @ts-ignore
    const difference = new Date('December 22, 2023 12:00:00 GMT') - new Date().getTime()

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return {days, hours, minutes, seconds}
    } else {
      return {days: 0, hours: 0, minutes: 0, seconds: 0}
    }
  }

  const timeLeft = signal(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      timeLeft.value = calculateTimeLeft()
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <>
      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title text-2xl pt-2 text-center justify-center font-black">
            Congratulations <span className="text-sm">(bois played well)</span>
          </h1>
          <figure>
            <img
              src="https://i.pinimg.com/originals/02/87/0c/02870c4b532d6a4c41e94efd979a4246.gif"
              alt="Haruhi Suzumiya Happy Birthday GIF"
            />
          </figure>
          <div className="text-lg">
            <p className="text-yellow-100 pt-4">Yay! 🎉 You've successfully added birthdays to your calendar! 📅😄</p>
          </div>
          <div className="text-2xl">
            <span className="text-white">
              Don't forget to star <span className="text-info">remind-us</span> on{' '}
              <a href="https://github.com/shouryade/remind-us">GitHub</a>!
            </span>
            <div className="card-actions justify-center pt-5">
              <button
                className="btn btn-neutral"
                onClick={() => {
                  localStorage.clear()
                  clearState()

                  location.route('/')
                }}
              >
                Signout
                <svg
                  class="h-6 w-6 fill-current md:h-8 md:w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WellDone
