import axios from 'axios'

const res = await axios.post('https://httpbin.org/post', {
  email: 'shourya.de12@gmail.com',
})
const pp = res.data.data
console.log(JSON.parse(pp).email)
