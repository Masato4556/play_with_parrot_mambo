var keypress = require('keypress');
var rxjs = require('rxjs');
var dronejs = require('dronejs');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// あなたのMamboの名前をセットしてください。
var DRONE_NAME = "Mambo_637131";

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress" => ', key);
  if (key) {
    if (key.name === 'x') {
      // xキーを押すとプログラムを終了する。
      console.log('close. bye.');
      process.stdin.pause();
      process.exit();
    }
  }
});

// Droneにある画像を全て削除する
function deleteAllPictures() {
  rxjs.Observable.fromPromise(dronejs.connect(DRONE_NAME))
    .flatMap(() => dronejs.listAllPictures())
    .concatMap(pictures => rxjs.Observable.from(pictures))
    .flatMap(pic => dronejs.deletePicture(pic))
    .subscribe(x => {
        process.stdin.pause();
        process.exit();
    });
}

deleteAllPictures();
