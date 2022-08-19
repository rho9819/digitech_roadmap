firebase.auth().onAuthStateChanged(async(user) => {
    if (user) {
      if (!user.email.includes("@sdh.hs.kr")) {
                alert("학교계정으로만 로그인 가능합니다.");
                const user = firebase.auth().currentUser;
                user.delete().then(() => {
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
              } else {
                let uid = user.uid
var docRef = db.collection(uid).doc("question");
docRef.get().then((doc) => {
    if (doc.exists) {
        
        const subMenu = [["HTML", "CSS", "Java"], ["JavaScript", "React", "JSP", "Python"], ["Portfolio" , "면접"]]
const grade = localStorage.getItem("grade");
const subMenuBox = document.getElementById("sub-menu-box");
subMenu[grade].map((sub, i)=>{
    subMenuBox.innerHTML += `
    <div class="sub-menu ${i == 0 ? "success" : doc.data()[subMenu[grade][i-1]] ? "success" : ""}" ${i == 0 ? `onclick="goQuestion('${sub}')"` : doc.data()[subMenu[grade][i-1]] ? `onclick="goQuestion('${sub}')"` : ""}>${sub}</div>
    ${subMenu[grade].length == i+1 ? "" : '<i class="fa-solid fa-chevron-down"></i>'}
    
    `
})
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        db.collection(uid).doc("question").update({
          HTML: false
      })
      .then(() => {
          console.log("Document successfully updated!");
          docRef.get().then((doc) => {
            if (doc.exists) {
        
              const subMenu = [["HTML", "CSS", "Java"], ["JavaScript", "React", "JSP", "Python"], ["Portfolio" , "면접"]]
      const grade = localStorage.getItem("grade");
      const subMenuBox = document.getElementById("sub-menu-box");
      subMenu[grade].map((sub, i)=>{
          subMenuBox.innerHTML += `
          <div class="sub-menu ${i == 0 ? "success" : doc.data()[subMenu[grade][i-1]] ? "success" : ""}" ${i == 0 ? `onclick="goQuestion('${sub}')"` : doc.data()[subMenu[grade][i-1]] ? `onclick="goQuestion('${sub}')"` : ""}>${sub}</div>
          ${subMenu[grade].length == i+1 ? "" : '<i class="fa-solid fa-chevron-down"></i>'}
          
          `
      })
          }else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          }).catch((error) => {
            console.log("Error getting document:", error);
        });
      })
      .catch((error) => { 
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});



              }
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        'login_hint': 'sdh@sdh.hs.kr'
      });
      firebase.auth().signInWithRedirect(provider);
      firebase.auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
    
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // ...
            console.log(result);
          }
          // The signed-in user info.
          var user = result.user;
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    
    }
    });

    function goQuestion(subMenu) {
        localStorage.setItem("subMenu", subMenu)
        window.location.href = "./question.html"
    }