const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.addAdminRole = functions.https.onCall(async (data, context) => {
  
  
  // get user and add custom claim(admin)
  try {
    if (context.auth.token.admin !== true) {
      return { error: 'only admins can add other admin suckers'};
    }
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
    return {
      message: `Succes ${data.email} has been made an admin`
    };
  }
  catch(err) {
    return err;
  }
});
