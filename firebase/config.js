// Set the configuration for your app
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bulchimbun.firebaseapp.com",
  databaseURL: "https://bulchimbun.firebaseio.com",
  projectId: "bulchimbun",
  storageBucket: "bulchimbun.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_KEY,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

module.exports = firebaseConfig;
