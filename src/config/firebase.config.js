const AppError = require("../cores/appError");

const admin = require("firebase-admin");

const serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const verifyFirebaseToken = async (token) => {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
  } catch (err) {
    throw new AppError({ message: "Invalid Firebase token", statusCode: 400 });
  }
};

module.exports = { db, verifyFirebaseToken };
