import {batch, signal} from '@preact/signals'
import {token, SelectedFriends} from '../../state'
import axios from 'axios'
import {useEffect, useState} from 'preact/hooks'

const loading = signal(false)
const err = signal(false)
const succ = signal(false)

const SelectFriends = () => {
  const selections = signal([])
  const [birthdays, setBirthday] = useState([])

  useEffect(() => {
    loading.value = true
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('/.netlify/functions/fetch-birthdays')
        setBirthday(response.data)
        selections.value = new Array(response.data.length).fill(false)
      } catch (error) {
        console.error('Error fetching birthdays:', error)
      } finally {
        loading.value = false
      }
    }
    fetchBirthdays()
  }, [])

  let data = []

  const handleChange = index => {
    selections.value[index] = !selections.value[index]
    data = birthdays.filter((_, i) => selections.value[i])
  }

  const createNotifications = async notifs => {
    try {
      const accessToken = token.value
      const apiUrl = 'https://content.googleapis.com/calendar/v3/calendars/primary/events'

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }

      const requests = notifs.map(async (notif, index) => {
        const eventId = `remindus${notif.id}`
        const requestBody = {
          id: eventId,
          summary: `${notif.name}'s Birthday!`,
          description: `Bhai ka birthday hai!`,
          start: {
            date: `${notif.bday}`,
            timeZone: 'Asia/Kolkata',
          },
          end: {
            date: `${notif.bday}`,
            timeZone: 'Asia/Kolkata',
          },
          recurrence: ['RRULE:FREQ=YEARLY;COUNT=4'],
          reminders: {
            useDefault: false,
            overrides: [
              {method: 'email', minutes: 24 * 60},
              {method: 'popup', minutes: 30},
            ],
          },
        }

        try {
          const response = await axios.post(apiUrl, requestBody, {headers})
          console.log(`Event created with ID: ${eventId}`, response.data)
        } catch (error) {
          if (error.response && error.response.status === 409) {
            console.log(
              `Conflict error for ID ${eventId}, name ${notif.name}. Birthday already set in primary calendar.`,
            )
          } else {
            throw error
          }
        }
      })

      await Promise.all(requests)
    } catch (error) {
      console.error('Error creating events:', error.message)
      err.value = true
    } finally {
      batch(() => {
        succ.value = true
        loading.value = false
      })
      setTimeout(() => {
        SelectedFriends.value = true
      }, 5000)
    }
  }

  return (
    <>
      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title text-2xl pt-2 text-center justify-center font-black">
            Choose your Friends <span className="text-sm">(..wisely)</span>
          </h1>
          <div className="text-lg">
            <p>
              Now this shouldn't be hard <span className="line-through text-primary">easy</span> .
            </p>
            <p>Choose the friends you'd like to receive notifications for!</p>
          </div>
          {loading.value && (
            <p>
              <div className="flex flex-col gap-4 w-full p-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
              <h1 className="card-title text-2xl pt-2 text-center justify-center font-black">
                Waking up the minions...
              </h1>
              <h1 className="card-body text-2xl text-center font-black text-primary">
                Please wait while the minions do their work
              </h1>
              <h1 className="card-body text-xl font-normal">Grabbing extra minions...</h1>
            </p>
          )}
          {!loading.value && !err.value && succ.value && (
            <>
              <div role="alert" className="alert alert-success">
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
                <span>
                  Successfully added notifications to your calendar! Redirecting you to success page in 5 seconds
                </span>
              </div>
            </>
          )}
          {!loading.value && err.value && (
            <div role="alert" className="alert alert-error mt-2">
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
              <span>Error! Report it asap to me :/</span>
            </div>
          )}
          {!loading.value && !succ.value && (
            <>
              <div className="card-actions justify-center pt-5">
                <div className="flex flex-col">
                  <div className="form-control w-full pb-4 mb-4">
                    {birthdays.map((person, index) => {
                      return (
                        <label className="cursor-pointer label flex items-center" key={index}>
                          <div className="avatar">
                            <div className="w-12 rounded-full mr-2">
                              <img src={person.picture} />
                            </div>
                          </div>
                          <span className="label-text text-lg text-white">
                            {person.name}
                            <div className="badge badge-accent badge-outline badge-lg ml-4 mr-4">
                              {new Date(person.bday).toLocaleDateString('en-GB').slice(0, 5)}
                            </div>
                          </span>
                          <input
                            type="checkbox"
                            className="toggle toggle-info"
                            id={`${person.id}`}
                            name={person.name}
                            value={person.bday}
                            checked={selections[index]}
                            onChange={e => {
                              handleChange(index)
                            }}
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary text-center justify-center"
                onClick={() => {
                  loading.value = true
                  createNotifications(data)
                }}
              >
                Prepare for Notifications!
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SelectFriends
