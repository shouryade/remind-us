import {signal} from '@preact/signals'
import axios from 'axios'

import {progress, isLogin, user} from '../state'
import {getNextBirthday} from '../bday'
let day = signal(1)
let month = signal(1)

const BirthdayComponent = () => {
  const updateFun = () => {
    progress.value += 33
    isLogin.value = true
  }
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
    console.log(day.value)
    console.log(month.value)
    const apiEndpoint = '/.netlify/functions/add-data'
    const data = {
      email: user.value.email,
      id: user.value.id,
      name: user.value.name,
      bday: nextBirthdayDate,
    }

    // Assuming you're using fetch to send data to the API
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('API Response:', result)
        // Handle the API response as needed
      })
      .catch(error => {
        console.error('Error sending data to API:', error)
        // Handle the error
      })
  }
  const months = Array.from({length: 12}, (_, index) => index + 1)
  const days = Array.from({length: 31}, (_, index) => index + 1)

  return (
    <div className="card bg-base-300">
      <div className="card-body items-center text-center">
        <h1 className="card-title text-5xl font-bold">Hey {user.value.name} 👋</h1>

        <p className="py-2">
          It's always a celebration when you're here! 🥳
          <br />
          Before you start selecting birthdays for notifications, how about letting us know when your special day is?
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
      </div>
    </div>
  )
}

export default BirthdayComponent
