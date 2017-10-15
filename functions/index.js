var functions = require('firebase-functions')
const cors = require('cors')({
  origin: true
})

exports.helloWorld = functions.https.onRequest((req, res) => {
  cors((req, res, () => {
    res.send('Hello from Firebase!')
  }))
})
// // Start writing Firebase Functions
// // https://firebase.google.com/preview/functions/write-firebase-functions
//
// exports.helloWorld = functions.https().onRequest((request, response) => {
//   response.send('Hello from Firebase!')
// })
