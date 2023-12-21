const {google} = require('googleapis')

const {CLIENT_SECRET, CLIENT_ID, REDIRECT_URL} = process.env

// Access scopes for Calendar API and profile info
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
]

exports.handler = async () => {
  try {
    const redirectURL = await authorize()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/html',
      },
      body: JSON.stringify({redirectURL}),
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }
}

async function authorize() {
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes, // Pass in the scopes array defined above.
    include_granted_scopes: true, // Enable incremental authorization. Recommended as a best practice.
  })

  return authorizationUrl
}
