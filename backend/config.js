
const admin = require("firebase-admin");

const serviceAccount = require("./ssdf-76ab6-firebase-adminsdk-q3zrk-8a07d2d405.json");
dbUrl = "https://console.firebase.google.com/project/ssdf-76ab6/firestore/data/~2F"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


module.export = admin;