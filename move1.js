var keypress = require('keypress');
var rxjs = require('rxjs');
var dronejs = require('dronejs');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// あなたのMamboの名前をセットしてください。
var DRONE_NAME = "XXXXXXXXXXXX";

/**
 * 写真撮影関数
*/
function takePic() {
  return dronejs.takePicture()
  .then(() => dronejs.listAllPictures())
  .then(pictures => {
    targetPic = pictures[0];
    return dronejs.flatTrim();
  });
}

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

// Droneにある画像一覧を表示する
function listAllPictures() {
  rxjs.Observable.fromPromise(dronejs.connect(DRONE_NAME))
    .flatMap(() => dronejs.listAllPictures())
    .subscribe(x => console.log(x));
}

// Droneにある画像を全て削除する
function deleteAllPictures() {
  rxjs.Observable.fromPromise(dronejs.connect(DRONE_NAME))
    .flatMap(() => dronejs.listAllPictures())
    .concatMap(pictures => rxjs.Observable.from(pictures))
    .flatMap(pic => dronejs.deletePicture(pic))
    .subscribe(x => console.log(x));
}

// Droneにある最新の画像をダウンロードする
function download() {
  var targetPic;
  console.log('download start');
  return dronejs.listAllPictures()
    .then(pictures => {console.log(pictures); targetPic = pictures[0]})
    .then(() => dronejs.downloadPicture(targetPic, 'output'))
    .then((response)=> {
      if (response === 'success') {
        console.log('picture downloaded successfully...');
      } else {
        console.log(response);
      }
    });
}

/**
 * ドローンを動かします
 *
 * 使い方:
 *   dronejs.connect(DRONE_NAME)から初めて、.thenで処理を続けて書いていきます。
 *   最後は.catch()でエラー処理を書いて、;を書いて処理を終了させます。
 *
 * コマンド:
 *
 *   飛行状態を変化:
 *     離陸: dronejs.takeOff() 
 *     安定化: dronejs.flatTrim() : 離陸前に必ず1度呼ぶ
 *     着陸: dronejs.land()
 *
 *   移動:
 *     前進: dronejs.forward() : 引数には、進む強さと回数を指定する
 *     右を向く: dronejs.turnRight() : 引数には回転の強さと回数を指定する
 *
 *   Grabberを動かす:
 *     つかむ: dronejs.grabClose()
 *     はなす: dronejs.grabOpen()
 *
 *   その他:
 *     ログを出力する: dronejs.enableLogging() : 引数にログファイルを出すディレクトリを指定します
 *     ドローンの状態を確認する: dronejs.checkAllStates() : これを行ったあと、ドローンの詳しい状態が送られてきます
 *
 */
function main() {
  console.log('start')

  // ドローンの状態を受け取るイベントストリーム(rxjsのObservableオブジェクト)を取得します
  const navDataStream = dronejs.getNavDataStream();
  navDataStream.subscribe((data) => {
       console.log(data);
    },
    e => debug(e),
    () => debug('complete')
  );

  // ここから処理を書いていきます
  dronejs.connect(DRONE_NAME)
    .then(() => dronejs.grabOpen())
    .then(() => dronejs.checkAllStates())
    .then(() => dronejs.flatTrim())
    // 飛ぶ
    .then(() => dronejs.takeOff())
    .then(() => dronejs.flatTrim())
    .then(() => dronejs.forward(90, 2))
    .then(() => dronejs.flatTrim())
    .then(() => dronejs.land())
    // 降りる
    .then(() => dronejs.grabClose())
    .then(() => dronejs.flatTrim())
    // 飛ぶ
    .then(() => dronejs.takeOff())
    .then(() => dronejs.flatTrim())
    .then(() => dronejs.turnRight(90, 3))
    .then(() => dronejs.turnRight(90, 3))
    .then(() => dronejs.flatTrim())
    .then(() => dronejs.forward(90, 1))
    .then(() => dronejs.flatTrim())
    .then(() => dronejs.land())
    .then(() => dronejs.disconnect())
    .then(() => {
      process.stdin.pause();
      process.exit();
    })
    .catch((e) => {
      console.log('エラー: ' + e);
      process.stdin.pause();
      process.exit();
    });
}

main(); // 関数を実行します
