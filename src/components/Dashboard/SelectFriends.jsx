import {signal} from '@preact/signals'
import {user, token} from '../../state'
import axios from 'axios'
import {useEffect} from 'preact/hooks'

// IIFE to fetch birthdays from API (oh god why was this so hard)
// const birthdays = await (async () => {
//   try {
//     const response = await axios.get('/.netlify/functions/fetch-birthdays')
//     return response.data
//   } catch (error) {
//     console.error('Error fetching birthdays:', error)
//     return null
//   }
// })()

const SelectFriends = () => {
  const selections = signal([])

  const birthdays = []

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('/.netlify/functions/fetch-birthdays')
        const birthdays = response.data
        selections.value = new Array(birthdays.length).fill(false)
      } catch (error) {
        console.error('Error fetching birthdays:', error)
      }
    }

    fetchBirthdays()
  }, []) // Empty dependency array to ensure the effect runs only once when the component mounts

  let data = []

  const handleChange = index => {
    selections.value[index] = !selections.value[index]
    data = birthdays.filter((_, i) => selections.value[i])
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
              console.log(data)
            }}
          >
            Prepare for Notifications!
          </button>
        </div>
      </div>
    </>
  )
}

export default SelectFriends
