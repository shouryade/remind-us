const Firestore = require('@google-cloud/firestore')
const {FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID} = process.env

const db = new Firestore({
  projectId: FIREBASE_PROJECT_ID,
  credentials: {
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key: FIREBASE_PRIVATE_KEY,
  },
})

exports.handler = async event => {
  try {
    const user = JSON.parse(event.body)
    const dataRef = db.collection('users').doc(user.email)

    await dataRef.set({
      name: user.name,
      picture: user.picture,
      email: user.email,
      id: user.id,
      bday: user.bday,
    })

    console.log('success')

    return {
      statusCode: 200,
      body: JSON.stringify({message: 'Success'}),
    }
  } catch (error) {
    console.error('error', error)

    return {
      statusCode: 400,
      body: JSON.stringify({message: 'Error saving data'}),
    }
  }
}
