const { initializeApp } = require("firebase/app");
const { getDatabase, ref, update, get } = require("firebase/database");
const firebaseConfig = require("./config");

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getUsersSnapshot = async () => {
  const usersRef = ref(db, "users/");

  const snapshot = await get(usersRef);
  const data = snapshot.val();

  return data;
};

module.exports = { db, ref, update, getUsersSnapshot };
