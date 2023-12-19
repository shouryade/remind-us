import {signal} from '@preact/signals'

export const progress = signal(0)
export const isLogin = signal(false)
export const url = signal('')
export const token = signal('')
export const user = signal({
  name: 'shourya',
  id: 0,
  email: 'shourya.de12@gmail.com',
  bday: null,
})
