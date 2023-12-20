import {user} from '../../state'

const birthday1 = {
  name: 'Shourya',
}

const birthdays = [
  {name: 'Leena Gupta', email: 'shourya.de12@gmail.com', id: 18, bday: '2024-05-17'},
  {bday: '2024-10-12', name: 'Shourya De', id: 0, email: 'shourya.de12@gmail.com'},
]

const SelectFriends = () => {
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
                      <span className="label-text text-lg text-white">
                        {person.name}
                        <div className="badge badge-accent badge-outline badge-lg ml-4 mr-4">
                          {new Date(person.bday).toLocaleDateString('en-GB').slice(0, 5)}
                        </div>
                      </span>

                      <input type="checkbox" className="toggle toggle-info" />
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
          <button className="btn btn-primary text-center justify-center">Select</button>
        </div>
      </div>
    </>
  )
}

export default SelectFriends
