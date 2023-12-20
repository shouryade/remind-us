const Firestore = require('@google-cloud/firestore')
const {FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID} = process.env

const db = new Firestore({
  projectId: FIREBASE_PROJECT_ID,
  credentials: {
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key: FIREBASE_PRIVATE_KEY,
  },
})

exports.handler = async (event, context, callback) => {
  const user = JSON.parse(event.body)
  const dataRef = db.collection('users').doc(user.name)

  try {
    await dataRef.set({
      name: user.name,
      email: user.email,
      id: user.id,
      bday: user.bday,
    })

    console.log('success')
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({message: 'Success'}),
    })
  } catch (error) {
    console.log('error', error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: 'Error', error: error.message}),
    })
  }
}
