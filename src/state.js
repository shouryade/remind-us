import {signal} from '@preact/signals'

export const progress = signal(0)
export const isLogin = signal(false)
export const submitSucc = signal(false)
export const HasBirthdaySet = signal(false)
export const url = signal('')
export const token = signal('')
export const user = signal({
  name: 'shourya',
  id: 0,
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocI7MWzYPLFPkNy35afPXWTKuJdTQv4GXEuZ-JdN4pcCFaY=s96-c',
  email: 'shourya.de12@gmail.com',
  bday: null,
})
