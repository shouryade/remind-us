const Firestore = require('@google-cloud/firestore')
const {FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID} = process.env

const db = new Firestore({
  projectId: FIREBASE_PROJECT_ID,
  credentials: {
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key: FIREBASE_PRIVATE_KEY,
  },
})

module.exports.handler = async event => {
  try {
    const data = JSON.parse(event.body)
    const email = data.email
    const docRef = db.collection('users').doc(email)

    const doc = await docRef.get()

    if (doc.exists) {
      console.log('Document data:', doc.data())
      return {
        statusCode: 200,
        body: JSON.stringify(true),
      }
    } else {
      console.log('No such document!')
      return {
        statusCode: 200,
        body: JSON.stringify(false),
      }
    }
  } catch (error) {
    console.log('Error getting document:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({message: 'Error fetching data'}),
    }
  }
}
