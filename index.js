function moveBox(event) {
     var box = document.querySelector('.box');
     box.style.display = 'inline-block';
     box.style.left = '0';
     box.style.opacity = 1;

     var link = event.target;
     var linkRect = link.getBoundingClientRect();
     var linkCenterX = linkRect.left + linkRect.width / 2;

     //var boxWidth = box.offsetWidth;

     box.style.width = linkRect.width + 'px';
     //var boxHeight = box.offsetHeight;
     var boxX = linkCenterX - linkRect.width / 2;
     //var boxY = linkRect.bottom;
     //box.style.transform = 'translate(' + boxX + 'px, ' + boxY + 'px)';
     box.style.transform = 'translateX(' + boxX + 'px)';
}

function removeBox() {
     var box = document.querySelector('.box');
     box.style.opacity = 0;
}

function showBox() {
     var box = document.querySelector('.box');
     box.style.opacity = 1;
}

function showLogin(type) {
     loginWrapper.style.display = 'inline';
     if (type == 0) {
          loginContent.style.display = 'flex';
          signupContent.style.display = 'none';
     } else {
          signupContent.style.display = 'flex';
          loginContent.style.display = 'none';
     }
     loginWrapper.style.opacity = 1;
}

function closeLogin() {
     //const loginWrapper = document.querySelector(".loginWrapper");
     loginWrapper.style.opacity = 0;
     loginWrapper.style.display = 'none';
}

/***login authentication *****/
const firebaseConfig = {
     apiKey: 'AIzaSyBOEl_rUKbkYLZFcuggbacGjpA6GKRx3TA',
     authDomain: 'tradefinder-d8892.firebaseapp.com',
     databaseURL: 'https://tradefinder-d8892-default-rtdb.asia-southeast1.firebasedatabase.app',
     projectId: 'tradefinder-d8892',
     storageBucket: 'tradefinder-d8892.appspot.com',
     messagingSenderId: '376720258538',
     appId: '1:376720258538:web:d36321540b36e599a2ee93',
     measurementId: 'G-2WSFSLRYQW',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//get element
const loginWrapper = document.querySelector('.loginWrapper');
const loginContent = loginWrapper.querySelector('.contentLogin');
const signupContent = loginWrapper.querySelector('.contentSignup');
const emailInput = document.getElementById('emailInput');
const pwdInput = document.getElementById('pwdInput');
const emailInput_signup = document.getElementById('emailInput_signup');
const pwdInput_signup = document.getElementById('pwdInput_signup');
const loginBut = document.getElementById('loginBut');
const signupBut = document.getElementById('signupBut');
const referInput = document.getElementById('referInput');
const welcomeText = document.getElementById('welcomeText');
const loginBut_menu = document.getElementById('loginBut_menu');
const signupBut_menu = document.getElementById('signupBut_menu');

//function
function login() {
     //console.log(encryptPwd("allin","allin")); //U2FsdGVkX1++C/4PfBYosrEtxiviet+ylV/6JX3r930=
     authenticate(emailInput.value, pwdInput.value);
}

function signup() {
     if (referInput.value === 'allin') {
          register(emailInput_signup.value, pwdInput_signup.value, referInput.value);
     } else {
          alert('Invalid referral code');
     }
}

function register(EMAIL, PASSWORD, REFERCODE) {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('UserList');

     const newUser = {
          email: EMAIL,
          password: encryptPwd(PASSWORD),
          referral: REFERCODE,
          idkey: null,
     };

     thelist
          .push()
          .then((newChildRef) => {
               // Get the push key value
               const pushKey = newChildRef.key;

               // Set the push key value in the new object
               newUser.idkey = pushKey;

               // Update the new child with the new object
               return newChildRef.set(newUser);
          })
          .then(() => {
               alert('Register successfully');
          })
          .catch((error) => {
               console.error(error);
          });

     /*
     thelist.push({
          email: EMAIL,
          password: encryptPwd(PASSWORD),
          referral: REFERCODE,
     });

     alert('Register successfully');*/
}

function authenticate(email_enter, pwd_enter) {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('UserList');
     var isLogin = false;
     //console.log(encryptPwd("始祖の巨人"));

     thelist.once('value', function (snapshot) {
          thedata = snapshot.val();
          var id = snapshot.key;

          snapshot.forEach(function (data) {
               //data is the bundle
               thedata = data.val(); //thedata is the data of the bundle
               var thekey = data.key; //key is thee key of bundle
               var emailGet = thedata['email']; //retrieve using parameter
               var passwordGet = thedata['password'];

               if (email_enter == emailGet && pwd_enter == decryptPwd(passwordGet, '6JX3r930=')) {
                    isLogin = true;
                    alert('Success login');
                    welcomeText.style.display = 'inline';
                    welcomeText.textContent = 'Welcome back, ' + email_enter;
                    localStorage.setItem('Finder', JSON.stringify(thekey));
                    localStorage.setItem('Finder_mail', JSON.stringify(emailGet));
                    checkFinder();
                    closeLogin();
                    return;
               }
          });

          if (!isLogin) {
               alert('Invalid user or password');
          }
     });
}

function encryptPwd(cipher) {
     var pass12 = CryptoJS.AES.encrypt(cipher, '6JX3r930='); //(text, key)
     return pass12.toString();
}

function decryptPwd(passphrase, thekey) {
     var pass12 = CryptoJS.AES.decrypt(passphrase, thekey);
     return pass12.toString(CryptoJS.enc.Utf8);
}

checkFinder();
function checkFinder() {
     const idFinder = localStorage.getItem('Finder');
     const moreIcon = document.getElementById('moreIcon');
     const midUl = document.querySelector('.midUl');
     const menuIcon = document.getElementById('menuIcon');
     var screenWidth = window.innerWidth;
     console.log(idFinder);

     if (idFinder == null) {
          midUl.style.display = 'none';
          moreIcon.style.display = 'none';
          welcomeText.style.display = 'none';
          menuIcon.style.display = 'none';
          loginBut_menu.style.display = 'inline';
          signupBut_menu.style.display = 'inline';

     } else {
          const emailFinder_get = localStorage.getItem('Finder_mail');
          let emailFinder = emailFinder_get.replace(/"/g, '');


          if(screenWidth >= 900){
               midUl.style.display = 'flex';
          }else{
               midUl.style.display = 'none';
          }
          welcomeText.style.display = 'inline';
          moreIcon.style.display = 'inline';
          welcomeText.textContent = 'Welcome back, ' + emailFinder;
          menuIcon.style.display = 'inline';
          
          loginBut_menu.style.display = 'none';
          signupBut_menu.style.display = 'none';

     }
}

function showOption() {
     const moreDiv = document.getElementById('moreDiv');

     if (moreDiv.style.opacity == 0) {
          moreDiv.style.opacity = '1';
     } else {
          moreDiv.style.opacity = '0';
     }
}

function moreOption(choice) {
     switch (choice) {
          case 1:
               moreDiv.style.opacity = '0';
               localStorage.clear();
               checkFinder();
               break;
     }
}

function openMenu(){
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');

     const mainHeader =document.querySelector('.mainHeader');

     mainHeader.style.zIndex = 0;
     sideWall.style.opacity = 1
     sideBar.style.right = '0'
     sideWall.style.zIndex = 1;
     blurArea.style.backdropFilter = "blur(3px)";

     closeLogin();
}

function closeMenu(){
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');

     const mainHeader =document.querySelector('.mainHeader');

     mainHeader.style.zIndex = 99;

     sideBar.style.right = '-320px'
     blurArea.style.backdropFilter = "blur(0px)";


     sideBar.addEventListener("transitionend", function() {
          if (sideBar.style.right=== '-320px') {
               sideWall.style.opacity = 0
               sideWall.style.zIndex = -1;
          }
        }, { once: true });


}



//admin@gmail.com
//123
