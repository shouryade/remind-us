const {google} = require('googleapis')

const {CLIENT_SECRET, CLIENT_ID, REDIRECT_URL} = process.env

exports.handler = async event => {
  const {code} = event.queryStringParameters
  const referer = event.headers.referer

  try {
    const token = await getAccessToken(code)
    console.log(token)
    return {
      statusCode: 302,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Cache-Control': 'no-cache',
        Location: `https://remindus.netlify.app/dashboard?token=${token.tokens.access_token}`,
      },
      body: JSON.stringify({event: token.tokens.access_token}),
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
        error: 'I AM AN ERROR MESSAGE',
      }),
    }
  }
}

async function getAccessToken(code) {
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

  try {
    const {tokens} = await oAuth2Client.getToken(code)
    return {tokens}
  } catch (error) {
    console.error('Error retrieving access token', error)
    throw error
  }
}
