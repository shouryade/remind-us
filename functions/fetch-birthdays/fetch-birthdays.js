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
    const snapshot = await db.collection('users').get()
    const data = snapshot.docs.map(doc => ({
      name: doc.data().name,
      picture: doc.data().picture,
      email: doc.data().email,
      id: doc.data().id,
      bday: doc.data().bday,
    }))

    console.log('success')

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error('error', error)

    return {
      statusCode: 400,
      body: JSON.stringify({message: 'Error fetching data'}),
    }
  }
}
