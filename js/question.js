const questions = {
    HTML: {
    title: "HTML의 요소가 아닌 것은?",
    question: [{answer: false,text:"요소(Elements)"}, {answer: false,text:"태그(Tag)"}, {answer: false,text:"값(Value)"}, {answer: true,text:"시멘틱(Semantic)"}]
},
CSS: {
    title: 'CSS에서 이 이미지를 어떻게 id에 의해 선택할 수 있을까요? <br/> 〈img id="mainpic" src="cat.png〉',
    question: [{answer: true,text:"#mainpic { }"}, {answer: false,text:"mainpic { }"}, {answer: false,text:"img { }"}, {answer: false,text:".mainpic { }"}]
},
Java: {
    title: "JAVA에서 스캐너 생성 방법으로 비어 있는 칸에 정답을 맞히세요! <br /> Scanner scanner = new Scanner()",
    question: [{answer: false,text:"Systam.in"}, {answer: false,text:"system.in"}, {answer: false,text:"system.In"}, {answer: true,text:"System.in"}]
},
JavaScript: {
    title: "다음 출력 값으로 올바른 것은? <br /> var arr = [100, 200, 300] <br /> console.log(typeof(arr))",
    question: [{answer: false,text:"undefined"}, {answer: false,text:"string"}, {answer: true,text:"object"}, {answer: false,text:"number"}]
},
React: {
    title: "리액트의 특징으로 옳은 것은?",
    question: [{answer: true,text:"단방향 데이터 바인딩"}, {answer: false,text:"선점형 멀티태스킹"}, {answer: false,text:"이벤트 기반 비동식 방식"}, {answer: false,text:"동적 타이핑"}]
},
JSP: {
    title: "JSP의 특징으로 아닌 것은??",
    question: [{answer: false,text:"유지 관리가 용이하다"}, {answer: true,text:"많은 사용자의 원활한 접속처리 X"}, {answer: false,text:"빠른 개발이 가능하다"}, {answer: false,text:"코드 길이를 줄일 수 있다."}]
},
Python: {
    title: '다음 출력 값으로 올바른 것은? <br /> a = "Hello World" <br /> print(a.upper())',
    question: [{answer: false,text:"Hello World"}, {answer: false,text:"Hello"}, {answer: false,text:"World"}, {answer: true,text:"HELLO WORLD"}]
},
Portfolio: {
    title: "포트폴리오 제작을 할 때 하면 안되는 것은?",
    question: [{answer: false,text:"좌측 상단 ~ 위측 하단으로 볼 수 있게 제작한다"}, {answer: false,text:"이미지 텍스트를 사방팔방 으로 해놓지 않는다."}, {answer: false,text:"기본 개념까진 설명하지 않는다"}, {answer: true,text:"대충 한다"}]
},
면접: {
    title: "면접관의 질문을 할 때 좋은 행동은?",
    question: [{answer: true,text:"눈을 계속 쳐다보며 간절함을 어필하면서 이야기 한다"}, {answer: false,text:"땅을 보면서 이야기 한다"}, {answer: false,text:"불안해 하면서 이야기 한다"}, {answer: false,text:"도망간다"}]
},
}
const subMenu = localStorage.getItem("subMenu");            
const questionsBox = document.getElementById("questions-box");
const currentQues = questions[subMenu]
    questionsBox.innerHTML += `
    <div id="Title">
                <h4>${subMenu}</h4>
                <h3>${currentQues.title}</h3>
            </div>
            
            <div id="questions">
                <div class="question" onclick="answerCheck(${currentQues.question[0].answer})"><p>${currentQues.question[0].text}</p></div>
                <div class="question" onclick="answerCheck(${currentQues.question[1].answer})"><p>${currentQues.question[1].text}</p></div>
                <div class="question" onclick="answerCheck(${currentQues.question[2].answer})"><p>${currentQues.question[2].text}</p></div>
                <div class="question" onclick="answerCheck(${currentQues.question[3].answer})"><p>${currentQues.question[3].text}</p></div>
            </div>    
    `

    var click = false;
    var uid;
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
                    uid = user.uid
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
function answerCheck(result) {
    if (!click) {
        click = true;
        db.collection(uid).doc("question").update({
        [subMenu]: true
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => { 
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    for (let i = 0; i < currentQues.question.length; i++) {
        document.getElementsByClassName("question")[i].classList.add(currentQues.question[i].answer?"answer":"no-answer")      
    }
    if (result) {
        questionsBox.innerHTML += `잘했어요 다음 레벨을 공부 하세요.`
    } else {
        questionsBox.innerHTML += `다시 한번 공부해보고 다음 레벨을 공부 하세요.`
    }
    questionsBox.innerHTML += `<a href="./index.html">메뉴로 가기</a>`
    }
    
    
}
