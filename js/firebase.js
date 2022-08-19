
    var firebaseConfig = {
        apiKey: "AIzaSyD6YroMTd8fts_kBhYDKPYQAv99tSYAlbc",
  authDomain: "loadmap-1f227.firebaseapp.com",
  projectId: "loadmap-1f227",
  storageBucket: "loadmap-1f227.appspot.com",
  messagingSenderId: "783460898189",
  appId: "1:783460898189:web:0774504ab6edad78e619c4",
  measurementId: "G-LL0VPGCCTT"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



function logout() {
    window.location.href="index.html"
    firebase.auth().signOut().then(() => {
// Sign-out successful.
}).catch((error) => {
// An error happened.
});
} 