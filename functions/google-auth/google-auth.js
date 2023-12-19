const {google} = require('googleapis')

const {CLIENT_SECRET, CLIENT_ID, REDIRECT_URL} = process.env

// Access scopes for read-only Drive activity.
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
]

// Generate a url that asks permissions for the Drive activity scope

exports.handler = async () => {
  let redirectURL

  try {
    redirectURL = await authorize()
  } catch (e) {
    console.log('error', e)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: e.message,
      }),
    }
  }

  if (!redirectURL) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: "Page isn't working!",
      }),
    }
  }

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

  function authorize() {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
    return getAccessToken(oauth2Client)
  }

  function getAccessToken(oauth2Client) {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
    })

    return authorizationUrl
  }
}
