const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { email, uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ email })
    .catch(console.error);
};

// twilio shiz
const accountSid = "ACcb3ad3a318ec866849c7ce25ea0be34a";
const authToken = "37373dc5df655b892e64cf4e0657631b";
const client = new twilio(accountSid, authToken);

const sendSMS = (to, body) => {
  client.messages.create({
    body: body,
    to: "+1" + to,
    from: "+12035294412"
  });
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  sendReminder: functions.pubsub
    .schedule("every 10000 minutes")
    .onRun(context => {
      sendSMS(
        "3857073236",
        "Hey, take your HT survey. https://healthtracker-4cece.web.app/"
      );
      return null;
    }),
  senInvite: functions.https.onCall((data, context) => {
    sendSMS(data.number, data.message);
    return "invite sent";
  })
};
