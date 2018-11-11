const { google } = require('googleapis');
const { prop } = require('ramda');
const { format } = require('date-fns');
const validateEnv = require('../utils/validateEnv');

validateEnv(['HN_OFFLINE_GOOGLE_CLIENT_ID', 'HN_OFFLINE_GOOGLE_CLIENT_SECRET']);

const {
  HN_OFFLINE_GOOGLE_CLIENT_ID: CLIENT_ID,
  HN_OFFLINE_GOOGLE_CLIENT_SECRET: CLIENT_SECRET,
} = process.env;

const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const getAuthUrl = () => {
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
};

const getTokens = (code) => {
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  return oAuth2Client.getToken(code).then(prop('tokens'));
};

const getDigest = async (tokens) => {
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const results = await gmail.users.messages.list({
    userId: 'me',
    q: `from:hello@hndigest.com after:${format(new Date(), 'YYYY/MM/DD')}`,
  });
  const message = results.data.messages[0];
  if (!message) {
    const error = new Error('No digest found');
    error.status = 404;
    throw error;
  }
  const email = await gmail.users.messages.get({
    userId: 'me',
    id: message.id,
    format: 'full',
  });

  const content = Buffer.from(
    email.data.payload.parts.find(part => part.mimeType === 'text/html').body.data,
    'base64',
  ).toString('utf8');

  return content;
};

module.exports = {
  getAuthUrl,
  getTokens,
  getDigest,
};
