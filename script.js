var request = window.indexedDB.open('test', 14);
var db = null;

handleErrorEvent = (evt) => {
  console.error(evt);
};

request.onerror = handleErrorEvent;

request.onsuccess = (evt) => {
  console.log('open event', evt);
  db = evt.target.result;
  db.onerror = handleErrorEvent;
};

request.onupgradeneeded = (evt) => {
  var db = evt.target.result;
  console.log('upgrade needed evt', evt);
  try {
    db.deleteObjectStore('test-store');
  } catch(err) {
    console.log(err);
  }
  db.createObjectStore('test-store', { autoIncrement: true });
};

function addSomething(db, n) {
  if (n <= 0) {
    return console.log('done');
  }
  var transaction = db.transaction(['test-store'], 'readwrite');
  transaction
    .objectStore('test-store')
    .add(kb(10));
  transaction.oncomplete = (evt) => {
    addSomething(db, n-1);
  };
}

window.start = (n) => addSomething(db, n);


function kb(n) {
  var i;
  var total = n*50;
  var str = '';
  for (i = 0; i < total; i++) {
    str += getRandomString();
  }
  return str;
}

function getRandomString() {
  var max = 9999999999;
  var min = 1000000000;
  var bits = Math.floor(Math.random() * (max - min)) + min;
  return bits;
}
