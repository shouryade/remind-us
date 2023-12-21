import {signal} from '@preact/signals'

export const progress = signal(0)
export const isLogin = signal(false)
export const HasBirthdaySet = signal(false)
export const url = signal('')
export const token = signal('')
export const user = signal({
  name: null,
  id: null,
  picture: null,
  email: null,
  bday: null,
})

export const clearState = () => {
  progress.value = 0
  isLogin.value = false
  HasBirthdaySet.value = false
  url.value = ''
  token.value = ''
  user.value = {
    name: null,
    id: null,
    picture: null,
    email: null,
    bday: null,
  }
  console.log('state cleared')
}
