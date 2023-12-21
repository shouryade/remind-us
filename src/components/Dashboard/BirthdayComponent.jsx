import {signal} from '@preact/signals'
import axios from 'axios'

import {progress, user, submitSucc, HasBirthdaySet} from '../../state'
import {getNextBirthday} from '../../bday'
let day = signal(1)
let month = signal(1)
let succ = signal(false)
let sub = signal(false)
let loading = signal(false)

const BirthdayComponent = () => {
  const {daysUntilNextBirthday, nextBirthdayDate} = getNextBirthday(month.value, day.value)
  const handleInputChange = (event, type) => {
    const value = event.target.value
    if (type === 'day') {
      day.value = value
    } else if (type === 'month') {
      month.value = value
    }
  }

  const handleSubmit = () => {
    sub.value = true
    loading.value = true
    const apiEndpoint = '/.netlify/functions/add-data'
    const data = {
      name: user.value.name,
      picture: user.value.picture,
      email: user.value.email,
      id: user.value.id,
      bday: nextBirthdayDate,
    }

    axios
      .post(apiEndpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('API Response:', response.data)
        succ.value = true
      })
      .catch(error => {
        console.error('Error sending data to API:', error)
        succ.value = false
      })
      .finally(() => {
        loading.value = false
      })
  }
  const months = Array.from({length: 12}, (_, index) => index + 1)
  const days = Array.from({length: 31}, (_, index) => index + 1)

  return (
    <div className="card bg-base-300">
      {loading.value && (
        <p>
          <div className="flex flex-col gap-4 w-full p-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <h1 className="card-title text-2xl pt-2 text-center justify-center font-black">Loading..</h1>
          <h1 className="card-body text-2xl text-center font-black text-primary">Convincing AI not to turn evil..</h1>
          <h1 className="card-body text-xl font-normal">
            Sit back and hold tight as we add your birthhday to the database!
          </h1>
        </p>
      )}
      <div className="card-body items-center text-center">
        {!succ.value && !loading.value && (
          <>
            <h1 className="card-title text-5xl font-bold">Hey {user.value.name} 👋</h1>
            <p className="py-2">
              It's always a celebration when you're here! 🥳
              <br />
              Before you start selecting birthdays for notifications, how about letting us know when your special day
              is?
            </p>
            <div className="flex items-center flex-col space-y-4">
              <label htmlFor="day" className="text-accent">
                Day
              </label>
              <select
                className="select select-primary w-full max-w-xs"
                onChange={event => handleInputChange(event, 'day')}
                value={day.value}
              >
                <option disabled selected>
                  Day
                </option>
                {days.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <label htmlFor="month" className="text-accent">
                Month
              </label>
              <select
                className="select select-primary w-full max-w-xs"
                onChange={event => handleInputChange(event, 'month')}
                value={month.value}
              >
                <option disabled selected>
                  Month
                </option>
                {months.map(m => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <p className="text-primary">🥳 I have {daysUntilNextBirthday} days left for my birthday 🥳 </p>

              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit😎
              </button>
            </div>
          </>
        )}
        {succ.value && sub.value && (
          <>
            <h1 className="card-title text-5xl font-bold">Hey {user.value.name} 👋</h1>
            <p className="card-body py-2 text-lg">
              It's always a celebration when you're here! 🥳
              <br />
              <figure>
                <img
                  src="https://i.pinimg.com/originals/34/34/c4/3434c4b692a5176c13079980e94dd6df.gif"
                  alt="Haruhi Suzumiya Happy Birthday GIF"
                />
              </figure>
              Click on the button below to proceed selecting birthday notifications!
            </p>
            <div role="alert" className="my-2 alert alert-success">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>🥳 Your birthday has been added! 🎂</span>
              <button
                className="btn btn-neutral"
                onClick={() => {
                  progress.value = 66
                  submitSucc.value = true
                  HasBirthdaySet.value = true
                }}
              >
                Select Birthdays
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
          </>
        )}
        {!succ.value && sub.value && !loading.value && (
          <div role="alert" className="alert alert-error">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! We couldn't add your birthday to the database 😔. Try again?</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BirthdayComponent
