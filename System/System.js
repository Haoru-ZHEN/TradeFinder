/*
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
firebase.initializeApp(firebaseConfig);*/

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

function systemClick(event,option) {
     const optionUl = document.querySelector('.optionUl');
     var optionLi = optionUl.querySelectorAll('li');
     const entrySys = document.querySelector('.entrySys');
     const throttleSys = document.querySelector('.throttleSys');
     const cutSys = document.querySelector('.cutSys');
     const profitSys = document.querySelector('.profitSys');

     switch (option) {
          case 0:
               entrySys.style.display = 'flex';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'none';
               profitSys.style.display = 'none';

               break;
          case 1:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'flex';
               cutSys.style.display = 'none';
               profitSys.style.display = 'none';
               break;
          case 2:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'flex';
               profitSys.style.display = 'none';
               break;
          case 3:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'none';
               profitSys.style.display = 'flex';
               break;
     }

     optionLi.forEach((li) => {
          li.style.opacity = 0.5; // Set the desired opacity value
          li.style.borderBottom = '1px solid #38d39f';
     });

     const clickedLi = event.currentTarget;
     clickedLi.style.opacity = 1;
     clickedLi.style.borderBottom = '3px solid #38d39f';
}
