const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL
  })
});

// must pass something but is overriden later
// can stay for prod
const actionCodeSettings = {
  url: 'http://localhost'
};

async function generateEmailVerificationLink(email) {
  let link = null;

  try {
    link = await getAuth().generateEmailVerificationLink(email, actionCodeSettings);
  } catch(err) {
    console.log('err is: ', err);
  }

  return link;
}

module.exports = { generateEmailVerificationLink };



