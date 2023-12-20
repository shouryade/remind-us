import {user} from '../../state'
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
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="toggle toggle-primary" checked />
                </label>
              </div>
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="toggle toggle-secondary" checked />
                </label>
              </div>
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="toggle toggle-accent" checked />
                </label>
              </div>
            </div>
          </div>
          <button className="btn btn-primary text-center justify-center">Buy Now</button>
        </div>
      </div>
    </>
  )
}

export default SelectFriends
