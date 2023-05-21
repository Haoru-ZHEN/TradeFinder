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

const symbolInput = document.getElementById('symbolInput');
const describeInput = document.getElementById('describeInput');
const thetable = document.getElementById('thetable');
const moreDiv = document.getElementById('moreDiv');
const searchInput = document.getElementById('searchInput');
const loader = document.querySelector('.loaderContainer');
var moreDivIsShow = false;
var currentMoreDiv = 'TSLA';
const actionDiv = document.getElementById('actionDiv');
var actionDivIsShow = false;
var currentActionDiv = 'TSLA';
var selectIndex = 1;
var changeMade = false;

function addnewRow(PAIRNAME, DESCRIPTION, ACTION = 'Buy', BOOKMARK = false, ID) {
     var newRow = document.createElement('tr');

     var newCell0 = document.createElement('td');
     newCell0.textContent = ID;
     newCell0.style.display = 'none';

     var newCell1 = document.createElement('td');
     newCell1.textContent = PAIRNAME;

     var newCell2 = document.createElement('td');
     newCell2.textContent = 170;

     var newCell3 = document.createElement('td');
     newCell3.className = 'actionTD'; /*
     // Create a new span element with class "actionContainer" and append it to the td element
     var spanElement = document.createElement('span');
     spanElement.className = 'actionContainer buyAction';

     // Create a new span element with class "dotSpan" and append it to the span element
     var dotSpanElement = document.createElement('span');
     dotSpanElement.className = 'dotSpan buyActionDot';
     spanElement.appendChild(dotSpanElement);
     // Create a new text node with the text "Sell" and append it to the span element
     var textNode = document.createTextNode(ACTION);
     spanElement.appendChild(textNode);*/
     var spanElement = returnActionElement(ACTION);
     newCell3.appendChild(spanElement);

     var newCell4 = document.createElement('td');
     newCell4.textContent = 'wait';
     newCell4.classList.add('item');

     var newCell5 = document.createElement('td');
     var input = document.createElement('input');
     input.setAttribute('type', 'text');
     input.setAttribute('placeholder', 'Memo');
     input.setAttribute('oninput', 'descriptionChange()');
     input.value = DESCRIPTION;
     newCell5.appendChild(input);

     var newCell6 = document.createElement('td');
     var icon = document.createElement('i');
     icon.setAttribute('class', 'fa-solid fa-square-poll-vertical');
     newCell6.classList.add('iconTable');
     newCell6.appendChild(icon);

     var newCell7 = document.createElement('td');
     var icon2 = document.createElement('i');
     if (BOOKMARK) {
          icon2.setAttribute('class', 'uis uis-bookmark');
     } else {
          icon2.setAttribute('class', 'uil uil-bookmark');
     }
     icon2.style.color = '#ecd04c';
     newCell7.classList.add('iconTable');
     newCell7.appendChild(icon2);

     var newCell8 = document.createElement('td');
     var icon2 = document.createElement('i');
     icon2.setAttribute('class', 'uil uil-ellipsis-h');
     //icon2.setAttribute('id', 'chartIcon');
     //newCell8.classList.add('item');
     newCell8.classList.add('iconTable');
     newCell8.appendChild(icon2);

     newRow.appendChild(newCell0);
     newRow.appendChild(newCell1);
     newRow.appendChild(newCell2);
     newRow.appendChild(newCell3);
     newRow.appendChild(newCell4);
     newRow.appendChild(newCell5);
     newRow.appendChild(newCell6);
     newRow.appendChild(newCell7);
     newRow.appendChild(newCell8);

     thetable.appendChild(newRow);
     giveFunction();
}

function addPair() {
     if (validate()) {
          addnewRow(symbolInput.value, describeInput.value);
          addData(symbolInput.value, describeInput.value);
     }
}

function giveFunction() {
     //add function to the trash icon cell for every row
     var index;

     //console.log(thetable.rows[0].cells.length);

     for (var i = 1; i < thetable.rows.length; i++) {
          thetable.rows[i].cells[8].onclick = function () {
               var rowOffsetTop = this.parentElement.offsetTop;
               var topPosition = this.parentElement.getBoundingClientRect().top;
               //var c = confirm('Delete this row?');
               /*
               if (c === true) {
                    loadingBar.style.display = 'inline';
                    index = this.parentElement.rowIndex;
                    console.log('delete index' + index);
                    var thispair = tablee.rows[index].cells[1].textContent;

                    //tablee.deleteRow(index);
                    while (table.rows.length > 1) {
                         table.deleteRow(table.rows.length - 1);
                    }
                    numRow = table.rows.length;
                    deleteFirebase(thispair);
               }*/
               //console.log(rowOffsetTop);
               //console.log(topPosition);
               index = this.parentElement.rowIndex;

               if (
                    currentMoreDiv == thetable.rows[index].cells[1].textContent &&
                    moreDivIsShow == true
               ) {
                    moreDiv.style.display = 'none';
                    moreDivIsShow = false;
               } else {
                    moreDiv.style.display = 'flex';
                    moreDiv.style.top = topPosition + 'px';
                    moreDivIsShow = true;
                    currentMoreDiv = thetable.rows[index].cells[1].textContent;
                    selectIndex = index;
               }
          };

          thetable.rows[i].cells[3].onclick = function () {
               //var rowOffsetTop = this.parentElement.offsetTop;
               var topPosition = this.parentElement.getBoundingClientRect().top;

               index = this.parentElement.rowIndex;

               if (
                    currentActionDiv == thetable.rows[index].cells[1].textContent &&
                    actionDivIsShow == true
               ) {
                    actionDiv.style.display = 'none';
                    actionDivIsShow = false;
               } else {
                    actionDiv.style.display = 'flex';
                    actionDiv.style.top = topPosition + 30 + 'px';
                    actionDivIsShow = true;
                    currentActionDiv = thetable.rows[index].cells[1].textContent;
                    selectIndex = index;
               }
          };

          thetable.rows[i].cells[7].onclick = function () {
               index = this.parentElement.rowIndex;
               var iconEle = thetable.rows[index].cells[7].childNodes[0];
               //iconEle.className = 'uis uis-bookmark';

               if (iconEle.className == 'uis uis-bookmark') {
                    //bookmark false
                    iconEle.className = 'uil uil-bookmark';
               } else {
                    //bookmark true
                    iconEle.className = 'uis uis-bookmark';
                    iconEle.style.color = '#ecd04c';
               }

               changeMade = true;
          };
     }

     //add function to the chart icon cell for every row
     /*
     for (var i = 1; i < tablee.rows.length; i++) {
          tablee.rows[i].cells[8].onclick = function () {
               index = this.parentElement.rowIndex;
               //console.log('open chart:' + tablee.rows[index].cells[1].textContent);
               localStorage.setItem(
                    'chartURL',
                    JSON.stringify(tablee.rows[index].cells[2].textContent)
               );
               localStorage.setItem(
                    'pairName',
                    JSON.stringify(tablee.rows[index].cells[1].textContent)
               );
               selectRow = tablee.rows[index].cells[2].textContent;

               window.open('ChartPage.html');
          };
          getSNR(tablee.rows[i].cells[2].textContent, i);
     }*/
}

function returnActionElement(actionType) {
     var spanContainer = document.createElement('span');
     spanContainer.className = 'actionContainer buyAction';
     //newCell3.appendChild(spanContainer);

     var spanDot = document.createElement('span');
     spanDot.className = 'dotSpan';

     if (actionType == 'Buy') {
          spanContainer.classList.add('buyAction');
          spanDot.classList.add('buyActionDot');
          spanContainer.classList.remove('sellAction');
          spanDot.classList.remove('sellActionDot');

          spanContainer.textContent = '';
          spanContainer.appendChild(spanDot);
          var textNode = document.createTextNode('Buy');
          spanContainer.appendChild(textNode);
     } else if (actionType == 'Wait') {
          spanContainer.classList.remove('buyAction');
          spanDot.classList.remove('buyActionDot');
          spanContainer.classList.remove('sellAction');
          spanDot.classList.remove('sellActionDot');

          spanContainer.textContent = '';
          spanContainer.appendChild(spanDot);
          var textNode = document.createTextNode('Wait');
          spanContainer.appendChild(textNode);
     } else {
          spanContainer.classList.add('sellAction');
          spanDot.classList.add('sellActionDot');
          spanContainer.classList.remove('buyAction');
          spanDot.classList.remove('buyActionDot');

          spanContainer.textContent = '';
          spanContainer.appendChild(spanDot);
          var textNode = document.createTextNode('Sell');
          spanContainer.appendChild(textNode);
     }

     return spanContainer;
}

function actionBuy(actionType) {
     var spanContainer = thetable.rows[selectIndex].cells[3].childNodes[0];

     var spanDot = thetable.rows[selectIndex].cells[3].childNodes[0].childNodes[0];
     //console.log(spanContainer);
     var dotSpanElement = document.createElement('span');
     dotSpanElement.className = 'dotSpan';

     if (actionType == 0) {
          spanContainer.classList.add('buyAction');
          spanDot.classList.add('buyActionDot');
          spanContainer.classList.remove('sellAction');
          spanDot.classList.remove('sellActionDot');

          spanContainer.textContent = '';
          spanContainer.appendChild(spanDot);
          var textNode = document.createTextNode('Buy');
          spanContainer.appendChild(textNode);
     } else if (actionType == 1) {
          spanContainer.classList.remove('buyAction');
          spanDot.classList.remove('buyActionDot');
          spanContainer.classList.remove('sellAction');
          spanDot.classList.remove('sellActionDot');

          spanContainer.textContent = '';
          spanContainer.appendChild(spanDot);
          var textNode = document.createTextNode('Wait');
          spanContainer.appendChild(textNode);
     } else {
          spanContainer.classList.add('sellAction');
          spanDot.classList.add('sellActionDot');
          spanContainer.classList.remove('buyAction');
          spanDot.classList.remove('buyActionDot');

          spanContainer.textContent = '';
          spanContainer.appendChild(spanDot);
          var textNode = document.createTextNode('Sell');
          spanContainer.appendChild(textNode);
     }

     actionDiv.style.display = 'none';
     actionDivIsShow = false;
     changeMade = true;
}

function validate() {
     let withoutSpaces = symbolInput.value.replace(/\s/g, '');
     if (withoutSpaces == '') {
          alert("Pair name shouldn't be empty");
          return false;
     } else {
          return true;
     }
}

function descriptionChange() {
     changeMade = true;
}

const saveIcon = document.getElementById('saveIcon');

function enableSave() {
     if (changeMade) {
          saveIcon.style.color = 'var(--gold)';
     } else {
          if (saveIcon.style.color != 'var(--green)') {
               saveIcon.style.color = '#ccc';
          }
     }
}

function saveData() {
     if (saveIcon.style.color != 'var(--gold)') {
          alert('No change have made yet');
          return;
     }
     saveIcon.style.color = 'var(--green)';
     updateData();
     changeMade = false;
}

function saveAll() {
     var totalDataList = [];
     tr = thetable.getElementsByTagName('tr');

     for (var i = 1; i < tr.length; i++) {
          let dataList = [];
          td0 = tr[i].getElementsByTagName('td')[0];
          td1 = tr[i].getElementsByTagName('td')[1];
          td2 = tr[i].getElementsByTagName('td')[3];
          td4 = tr[i].getElementsByTagName('td')[5];
          td4_input = td4.getElementsByTagName('input')[0];
          td6 = tr[i].getElementsByTagName('td')[7];
          td6_icon = td6.getElementsByTagName('i')[0];
          //console.log(td4_input.value);
          //console.log(td6_icon.className);
          console.log(td0.textContent);

          if (td0) {
               dataList.push(td0.textContent);
               dataList.push(td1.textContent);
               dataList.push(td2.textContent);
               dataList.push(td4_input.value);
               dataList.push(td6_icon.className);
          }
          totalDataList.push(dataList);
     }

     return totalDataList;
}

function tableSearch() {
     let filter, tr, td, txtValue;

     filter = searchInput.value.toUpperCase();
     tr = thetable.getElementsByTagName('tr');

     for (var i = 1; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('td')[1];
          //console.log(td);

          if (td) {
               txtValue = td.textContent || td.innerText;
               if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
               } else {
                    tr[i].style.display = 'none';
               }
          }
     }
}

function filterAction(filterType) {
     const allFilter = document.getElementById('allFilter');
     const buyFilter = document.getElementById('buyFilter');
     const sellFilter = document.getElementById('sellFilter');
     const bookmarkFilter = document.getElementById('bookmarkFilter');

     //css
     //const elementCss = document.querySelector('.activeFilter');

     switch (filterType) {
          case 1:
               allFilter.classList.add('activeFilter');
               buyFilter.classList.remove('activeFilter');
               sellFilter.classList.remove('activeFilter');
               bookmarkFilter.classList.remove('activeFilter');
               filterProcess('All');
               //elementCss.style.backgroundColor = '#FBC02D'
               break;
          case 2:
               allFilter.classList.remove('activeFilter');
               buyFilter.classList.add('activeFilter');
               sellFilter.classList.remove('activeFilter');
               bookmarkFilter.classList.remove('activeFilter');
               filterProcess('Buy');
               //elementCss.style.backgroundColor = '#FBC02D'
               break;
          case 3:
               allFilter.classList.remove('activeFilter');
               buyFilter.classList.remove('activeFilter');
               sellFilter.classList.add('activeFilter');
               bookmarkFilter.classList.remove('activeFilter');
               filterProcess('Sell');
               //elementCss.style.backgroundColor = '#FBC02D'
               break;
          case 4:
               allFilter.classList.remove('activeFilter');
               buyFilter.classList.remove('activeFilter');
               sellFilter.classList.remove('activeFilter');
               bookmarkFilter.classList.add('activeFilter');
               filterProcess('Bookmark');
               //elementCss.style.backgroundColor = '#FBC02D'
               break;
     }
}

function filterProcess(thekey) {
     tr = thetable.getElementsByTagName('tr');

     for (var i = 1; i < tr.length; i++) {
          var td2 = tr[i].getElementsByTagName('td')[3];
          var td6 = tr[i].getElementsByTagName('td')[7];
          var td6_icon = td6.getElementsByTagName('i')[0];

          if (thekey == 'All') {
               tr[i].style.display = '';
          } else if (thekey == 'Bookmark') {
               if (td6_icon.className == 'uis uis-bookmark') {
                    tr[i].style.display = '';
               } else {
                    tr[i].style.display = 'none';
               }
          } else {
               if (td2.textContent == thekey) {
                    tr[i].style.display = '';
               } else {
                    tr[i].style.display = 'none';
               }
          }
     }
}

function moreOption(options) {
     switch (options) {
          case 1:
               break;
          case 2:
               var c = confirm('Delete this row? (Make sure you save all changes)');

               if (c === true) {
                    //index = this.parentElement.rowIndex;
                    //console.log('delete index' + index);

                    var deleteID = thetable.rows[selectIndex].cells[0].textContent;

                    //delete selected row--
                    //tablee.deleteRow(index);

                    //delete all rows--
                    while (thetable.rows.length > 1) {
                         thetable.deleteRow(thetable.rows.length - 1);
                    }

                    deleteFirebase(deleteID);
               }
               break;
          case 3:
               console.log('de');
               break;
     }
}

function deleteFirebase(_DELETEID) {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('WatchList').child(idFinder);
     var nodeRef = thelist.child(_DELETEID);
     console.log(_DELETEID);

     // Call the remove() method on the reference to delete the node
     nodeRef
          .remove()
          .then(() => {
               console.log('Node deleted successfully.');
               moreDiv.style.display = 'none';
               moreDivIsShow = false;
               selectIndex = 1;
               loadData();
          })
          .catch((error) => {
               console.error('Error deleting node:', error);
          });
}

function loadData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('WatchList').child(idFinder);
     loader.style.display = 'flex';
     thelist.once('value', function (snapshot) {
          //snapshot contain many bundles

          snapshot.forEach(function (data) {
               //console.log('HERE');
               //data is the bundle
               thedata = data.val(); //thedata is the data of the bundle
               var id = data.key; //key is thee key of bundle
               var SYMBOL = thedata['SYMBOL']; //retrieve using parameter
               var ACTION = thedata['ACTION'];
               var DESCRIP = thedata['DESCRIP'];
               var BOOKMARK = thedata['BOOKMARK'];
               var idKey = thedata['idkey'];

               addnewRow(SYMBOL, DESCRIP, ACTION, BOOKMARK, idKey);
          });
          loader.style.display = 'none';
          //giveFunction();
          //loadingBar.style.display = 'none';
          //loadingBar.classList.add('fade-out');
     });
}

function addData(_SYMBOL, _DESCRIPTION) {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('WatchList').child(idFinder);

     const newData = {
          SYMBOL: _SYMBOL,
          ACTION: 'Buy',
          DESCRIP: _DESCRIPTION,
          BOOKMARK: false,
          idkey: null,
     };

     thelist
          .push()
          .then((newChildRef) => {
               // Get the push key value
               const pushKey = newChildRef.key;

               // Set the push key value in the new object
               newData.idkey = pushKey;

               // Update the new child with the new object
               return newChildRef.set(newData);
          })
          .then(() => {
               //alert('Register successfully');
          })
          .catch((error) => {
               console.error(error);
          });
}

function updateData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('WatchList').child(idFinder);
     var updateList = saveAll();

     for (var i = 0; i < updateList.length; i++) {
          var isBookmark = false;
          if (updateList[i][4] == 'uis uis-bookmark') {
               isBookmark = true;
          }

          var updateData = {
               SYMBOL: updateList[i][1],
               ACTION: updateList[i][2],
               DESCRIP: updateList[i][3],
               BOOKMARK: isBookmark,
               idkey: updateList[i][0],
          };

          console.log(updateData);
          thelist.child(updateList[i][0].toString()).set(updateData);
     }
}

function openMenu() {
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');

     const mainHeader = document.querySelector('.mainHeader');

     mainHeader.style.zIndex = 0;
     sideWall.style.opacity = 1;
     sideBar.style.right = '0';
     sideWall.style.zIndex = 1;
     blurArea.style.backdropFilter = 'blur(3px)';
}

function closeMenu() {
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');

     const mainHeader = document.querySelector('.mainHeader');

     mainHeader.style.zIndex = 99;

     sideBar.style.right = '-320px';
     blurArea.style.backdropFilter = 'blur(0px)';

     sideBar.addEventListener(
          'transitionend',
          function () {
               if (sideBar.style.right === '-320px') {
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
          console.log('dwd');

     } else {
          midUl.style.display = 'none';
          console.log('dwd');
     }
}

var idFinder_get = localStorage.getItem('Finder');
let idFinder = idFinder_get.replace(/"/g, '');

loadData();
setInterval(enableSave, 1000);
mobileSetting();

//test@mail.com
//123

//https://www.tradingview.com/chart/sNMafjmh/?symbol=TSLA
