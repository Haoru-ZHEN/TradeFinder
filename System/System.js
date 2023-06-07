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

function systemClick(event, option) {
     const optionUl = document.querySelector('.optionUl');
     const optionBox = document.querySelector('.optionBox');
     var link = event.target;
     const clickedLi = event.currentTarget;
     var linkRect = link.getBoundingClientRect();

     var optionLi = optionUl.querySelectorAll('li');
     const entrySys = document.querySelector('.entrySys');
     const throttleSys = document.querySelector('.throttleSys');
     const cutSys = document.querySelector('.cutSys');
     const profitSys = document.querySelector('.profitSys');
     /*   
     optionBox.style.width = linkRect.width + 'px';
     optionBox.style.height = linkRect.height + 'px';
     var linkCenterX = linkRect.left + linkRect.width / 2;
     var boxX = linkCenterX - linkRect.width / 2;

     optionBox.style.transform = 'translateX(' + (linkRect.left - 203) + 'px)';*/

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
     /*
     optionLi.forEach((li) => {
          li.style.opacity = 0.5; // Set the desired opacity value
          li.style.borderBottom = '1px solid #38d39f';
     });

     const clickedLi = event.currentTarget;
     clickedLi.style.opacity = 1;
     clickedLi.style.borderBottom = '3px solid #38d39f';*/
     /*
     optionLi.forEach((li) => {
          li.style.color = '#5c5e62';
     });

     clickedLi.style.color = '#171a20';*/

     optionLi.forEach((li) => {
          li.classList.remove('activeOption');
     });

     clickedLi.classList.add('activeOption');
}

var longorshort = 'long';
function longshortClick(event, option) {
     const longshortUl = document.querySelector('.longshortUl');
     const longshortLi = longshortUl.querySelectorAll('li');
     const lsBox = document.querySelector('.lsBox');
     var link = event.target;
     var linkRect = link.getBoundingClientRect();

     lsBox.style.width = linkRect.width + 'px';
     lsBox.style.height = linkRect.height + 'px';
     //var linkCenterX = linkRect.left + linkRect.width / 2;
     //var boxX = linkCenterX - linkRect.width / 2;

     longshortLi.forEach((li) => {
          li.style.color = '#5c5e62';
     });

     lsBox.style.transform = 'translateX(' + (linkRect.left - 203) + 'px)';

     switch (option) {
          case 0:
               longorshort = 'long';
               lsBox.style.backgroundColor = 'rgb(84, 202, 175)';
               link.style.color = '#fff';
               break;
          case 1:
               longorshort = 'short';
               link.style.color = '#fff';
               lsBox.style.backgroundColor = 'rgb(255, 110, 102)';
               break;
     }
}

/***MENU FUNCTION */
function openMenu() {
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');
     var screenWidth = window.innerWidth;
     const mainHeader = document.querySelector('.mainHeader');

     if (screenWidth <= 600) {
          sideBar.style.width = '90%';
          sideBar.style.padding = '10px';
     } else if (screenWidth <= 900) {
          sideBar.style.width = '40%';
          sideBar.style.padding = '20px';
     } else {
          sideBar.style.width = '20%';
          sideBar.style.padding = '30px';
     }

     mainHeader.style.zIndex = 0;
     sideWall.style.opacity = 1;
     //sideBar.style.right = '0'

     sideWall.style.zIndex = 1;
     blurArea.style.backdropFilter = 'blur(3px)';
}

function closeMenu() {
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');

     const mainHeader = document.querySelector('.mainHeader');

     mainHeader.style.zIndex = 99;

     sideBar.style.width = '0';
     sideBar.style.padding = '0';

     blurArea.style.backdropFilter = 'blur(0px)';

     sideBar.addEventListener(
          'transitionend',
          function () {
               if (sideBar.style.width === '0px') {
                    sideWall.style.opacity = 0;
                    sideWall.style.zIndex = -1;
               }
          },
          { once: true }
     );
}

function mobileSetting() {
     const midUl = document.querySelector('.midUl');
     var screenWidth = window.innerWidth;

     if (screenWidth >= 900) {
          midUl.style.display = 'flex';
     } else {
          midUl.style.display = 'none';
     }
}

var resultCondition = '0,0,0,0';
function checkStrength() {
     var form = document.querySelector('.conditionForm');
     var formgroup = form.querySelectorAll('div');
     const spanTitle = form.querySelector('.spanTitle');
     const spanFront = form.querySelector('.spanFront');
     const strengthDiv = form.querySelector('.strengthDiv');

     var checkboxes = form.querySelectorAll('input[type="checkbox"]');

     // Count the number of checked checkboxes
     var con1 = '0';
     var con2 = '0';
     var con3 = '0';
     var con4 = '0';

     var checkedCount = 0;
     for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
               checkedCount++;

               switch (i) {
                    case 0:
                         con1 = '1';
                         break;
                    case 1:
                         con2 = '1';
                         break;
                    case 2:
                         con3 = '1';
                         break;
                    case 3:
                         con4 = '1';
                         break;
               }
          }
     }

     resultCondition = con1 + ',' + con2 + ',' + con3 + ',' + con4;

     spanFront.style.borderTopRightRadius = '0px';
     spanFront.style.borderBottomRightRadius = '0px';
     spanTitle.style.color = '#000';
     strengthDiv.style.boxShadow = 'none';

     switch (checkedCount) {
          case 0:
               spanFront.style.width = '0%';
               spanTitle.textContent = '0%';
               spanTitle.style.color = '#f6465d';

               break;
          case 1:
               spanFront.style.width = '25%';
               spanTitle.textContent = '25%';
               spanFront.style.backgroundColor = '#f6465d';
               break;
          case 2:
               spanFront.style.width = '50%';
               spanTitle.textContent = '50%';
               spanFront.style.backgroundColor = '#ecd04c';

               break;
          case 3:
               spanFront.style.width = '75%';
               spanTitle.textContent = '75%';
               spanFront.style.backgroundColor = '#2ebd85';

               break;
          case 4:
               spanFront.style.width = '100%';
               spanTitle.textContent = '100%';
               spanFront.style.backgroundColor = '#8b5cf6';
               //spanFront.style.background = 'linear-gradient(to right, #ec4899, #8b5cf6)';
               strengthDiv.style.boxShadow = '0 0 5px 2px rgba(139,92,246, 0.5)';
               //strengthDiv.style.boxShadow = "0 0 5px 2px rgba(236,72,153, 0.5)";

               spanFront.style.borderTopRightRadius = '50px';
               spanFront.style.borderBottomRightRadius = '50px';
               break;
     }
}

function calculateEntry() {
     const initialInput = document.getElementById('initialInput');
     const damageInput = document.getElementById('damageInput');
     const marginInput = document.getElementById('marginInput');
     const leverageInput = document.getElementById('leverageInput');
     const amountInput = document.getElementById('amountInput');

     var margin = parseFloat(initialInput.value) * (parseFloat(damageInput.value) / 100);
     marginInput.value = margin.toFixed(2);

     var amount = margin * leverageInput.value;
     amountInput.value = amount.toFixed(2);
}

function calculateCutloss() {
     const entryInput_cutloss = document.getElementById('entryInput_cutloss');
     const cutpriceInput_cutloss = document.getElementById('cutpriceInput_cutloss');
     const cutpercentInput_cutloss = document.getElementById('cutpercentInput_cutloss');
     const damagepercentInput_cutloss = document.getElementById('damagepercentInput_cutloss');
     const damageamountInput_cutloss = document.getElementById('damageamountInput_cutloss');

     const initialInput = document.getElementById('initialInput');
     const amountInput = document.getElementById('amountInput');


     var cutlossPercent = 0;
     if (longorshort == 'long') {
          cutlossPercent = (parseFloat(entryInput_cutloss.value) - parseFloat(cutpriceInput_cutloss.value)) /parseFloat(entryInput_cutloss.value)*100;
     } else {
          cutlossPercent = (parseFloat(cutpriceInput_cutloss.value) - parseFloat(entryInput_cutloss.value)) /parseFloat(entryInput_cutloss.value)*100;
     }

     cutpercentInput_cutloss.value = cutlossPercent.toFixed(2);

     var damageAmount = (cutlossPercent/100) *parseFloat(amountInput.value); 
     var damagePercent =( damageAmount /parseFloat(initialInput.value)) *100;

     damageamountInput_cutloss.value = damageAmount.toFixed(2);
     damagepercentInput_cutloss.value = damagePercent.toFixed(2);
}

/****add data to portfolio */
function addData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('Portfolio').child(idFinder);
     var newKey = thelist.push().key;
     console.log(newKey);

     const entrySys = {
          SYMBOL: pairInput.value || '-',
          LONGSHORT: longorshort,
          ENTRY_PRICE: parseFloat(entrypriceInput.value) || '-',
          data1: 'replace',
          IDKEY: newKey,
          ENTRY_MARGIN: parseFloat(marginInput.value) || '-',
          DAMAGE_COST: parseFloat(damageInput.value) || '-',
          LEVERAGE: parseFloat(leverageInput.value) || '-',
          ENTRY_AMOUNT: parseFloat(amountInput.value) || '-',
          ENTRY_CONDITION: resultCondition,
     };

     const throttleSys = {
          target_position: totalPositionInput_throttle.value || '-',
          ENTRY_MARGIN: parseFloat(percentInput1_throttle.value),
          DAMAGE_COST: parseFloat(amountInput1_throttle.value),
          LEVERAGE: parseFloat(priceInput1_throttle.value),
          ENTRY_AMOUNT: parseFloat(avgInput1_throttle.value),
     };

     const cutlossSys = {
          //target_position: entryInput_cutloss.value,
          CUTLOSS_PRICE: parseFloat(cutpriceInput_cutloss.value),
          //DAMAGE_COST: parseFloat(cutpercentInput_cutloss.value),
          //LEVERAGE: parseFloat(damagepercentInput_cutloss.value),
          //ENTRY_AMOUNT: parseFloat(damageamountInput_cutloss.value)
     };

     const profitSys = {
          //target_position: entryInput_cutloss.value,
          CUTLOSS_PRICE: parseFloat(cutpriceInput_cutloss.value),
          //DAMAGE_COST: parseFloat(cutpercentInput_cutloss.value),
          //LEVERAGE: parseFloat(damagepercentInput_cutloss.value),
          //ENTRY_AMOUNT: parseFloat(damageamountInput_cutloss.value)
     };

     var newData2 = {
          EntrySys: {
               data1: 'Value 1 for section 1',
               data2: 'Value 2 for section 1',
               ...entrySys,
          },
          throttleSys: {
               data1: 'Value 1 for section 1',
          },
          cutlossSys: {
               data1: 'Value 1 for section 3',
               data2: 'Value 2 for section 3',
          },
          profitSys: {
               data1: 'Value 1 for section 4',
               data2: 'Value 2 for section 4',
          },
     };

     //newData2.EntrySys = entrySys;
     thelist
          .child(newKey)
          .set(newData2)
          .then(() => {
               showToast('success', 'Add successful');
          })
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });

     /*
     thelist
          .push()
          .then((newChildRef) => {
               // Get the push key value
               const pushKey = newChildRef.key;

               // Set the push key value in the new object
               newData.idkey = pushKey;
               addnewRow(_SYMBOL, _DESCRIPTION, 'Buy', false, (ID = pushKey));

               showToast('success', 'Add successful');

               // Update the new child with the new object
               return newChildRef.set(newData);
          })
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });*/
}

function addPair() {
     if (validate()) {
          addData();
          pairInput.value = '';
          entrypriceInput.value = '';
     }
}

function validate() {
     let withoutSpaces = pairInput.value.replace(/\s/g, '');
     if (withoutSpaces == '' || entrypriceInput == '') {
          //alert("Pair name shouldn't be empty");
          showToast('error', "Symbol and entry price shouldn't be empty");
          return false;
     } else {
          return true;
     }
}

function addPortfolio() {
     addData();
}

// TOAST FUNCTION
const toastUl = document.getElementById('toastUl');
const toastDetails = {
     success: {
          icon: 'uim uim-check-circle',
          text: 'Action successful',
     },
     error: {
          icon: 'uim uim-exclamation-triangle',
          text: 'Error occurred',
     },
};

function removeToast(toast) {
     toast.classList.add('hide');
     if (toast.timeoutId) clearTimeout(toast.timeoutId);
     setTimeout(() => toast.remove(), 500);
}
function showToast(whichtoast, thetext) {
     const { icon, text } = toastDetails[whichtoast];
     const toast = document.createElement('li');
     toast.className = `toast ${whichtoast}`;
     toast.innerHTML = `<div class="column">
                              <i class="${icon}"></i>
                              <h3>${thetext}</h3>
                         </div>
                         <i class="uil uil-times" onclick="removeToast(this.parentElement)"></i>`;

     toastUl.appendChild(toast);

     toast.timeoutId = setTimeout(() => removeToast(toast), 4000);
}

//main
var idFinder_get = localStorage.getItem('Finder');
let idFinder = idFinder_get.replace(/"/g, '');
mobileSetting();
