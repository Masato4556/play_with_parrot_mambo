# ドローン

Parrot Mambo Missionを使って遊びます

## 内容

+ 環境構築
+ ドローンを動かしてみる

## 環境構築

#### gitコマンドを使えるようにしましょう

+ Macならターミナル
+ Windowsなら[git bash](https://git-for-windows.github.io/)

#### githubのアカウントを作りましょう

#### Pythonをインストールしましょう

+ ([Anacondaでインストール](https://www.anaconda.com/download/#macos))

#### Node.jsをインストールしましょう

+ Macの場合
  + nodebrewなどを使うと良いと思います

+ Windowsの場合
  + [こちら](https://nodejs.org/en/)などからインストーラをダウンロードしてインストールする

#### プログラムを準備しましょう

+ Windowsの場合、別途事前に下記コマンドを打つ

```
npm install --global windows-build-tools
npm install bluetooth-hci-socket
```

+ 共通のコマンド

```
git clone https://github.com/hiko2msp/play_with_parrot_mambo.git
cd play_with_parrot_mambo
pip install --upgrade --ignore-installed -r requirements.txt
npm i
cd node_modules
git clone https://github.com/hiko2msp/DroneJS.git dronejs
cd ../
```

+ Mac OS High Sierraの場合、上記コマンドでnobleのライブラリのインストールが失敗するため、下記コマンドを使ってインストールする

```
npm install git+https://github.com/PolideaInternal/noble.git#macos_highsierra
```

#### ドローンの名前を確認しましょう

+ ドローンの電源を入れる
+ 緑色のランプが点滅していることを確認する
+ 下記コマンドを打って、名前を確認する

  ```
  $ node find.js
  ------1台目: 
  a28118342ab84ddb85aac7271f72ddb7 Mambo_546341
  1: Mambo_546341 (a28118342ab84ddb85aac7271f72ddb7), RSSI -42
  ```

  上記のうち、'Mambo_546341'がドローンの名前となります

#### 最初のプログラムを実行しましょう

+ testFlight.jsとtestGrab.jsにドローンの名前を追記する
  ```
  // あなたのMamboの名前をセットしてください。
  var DRONE_NAME = "Mambo_546341";
  ```

+ 飛行テスト
  + 飛んで着陸するだけのプログラムです

  ```
  $ node testFlight.js
  ```

+ グラバーのテスト
  + 掴んで離すだけのプログラムです

  ```
  $ node testGrab.js
  ```

#### 画像の解析のプログラムを実行しましょう

+ 2つのターミナルを立ち上げます(Windowsの場合、git bashを2つ立ち上げます)
+ 両方のターミナルのCWD(カレントワーキングディレクトリ)をplay_with_parrot_mamboにします
+ 1つ目のターミナルで、Pythonの解析サーバを立ち上げます
  
  ```
  $ python run_server.py
  Using TensorFlow backend.
   * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
  ```

  上記の状態になるまで待ってください

+ 2つ目のターミナルでNode.jsから画像の解析のリクエストを解析サーバに送り、結果をNode.jsのプロセス上で表示します

  ```
  $ node testAnalyze.js
  start
  output/0.jpg,output/1.jpg
  --------------------------------------------------------
  [ 2, 3 ]
  --------------------------------------------------------
  ```

  上記のような解析結果が得られるはずです


+ 備考
  + 解析サーバが必要な理由
    + Pythonの解析にはKerasとTensorflowというディープラーニングのフレームワークを使用しています
    + Tensorflowは起動に時間がかかります
    + Node.jsからPythonのプロセスを実行することもできますが、ドローンとの接続が一定時間以上ない場合、ドローンとのコネクションが切れてしまいます
    + そのため、起動のオーバーヘッドの時間を、事前にサーバを立ち上げる際に処理しておくことで、解析の際にできるだけ短い時間で解析を行えるようにしております
    + もちろん、画像解析の処理速度を高速化すれば、Node.jsからPythonのプロセスを実行することも可能です。

#### チーム戦用のプログラムを実行してみましょう

##### Macの場合

+ 別のターミナルで画像処理用のPythonのサーバを実行する

  ```
  python run_server.py
  ```

+ macSample.jsにドローンの名前を追記する(14行目を下記のように修正します)
  ```
  // あなたのMamboの名前をセットしてください。
  var DRONE_NAME = "Mambo_546341";
  ```

+ macSample.jsを動かす

  ```
  $ node macSample.js
  ```

##### Windowsの場合

+ 別のターミナルで画像処理用のPythonのサーバを実行する

  ```
  python run_server.py
  ```

+ winSample.jsにドローンの名前を追記する(14行目を下記のように修正します)
  ```
  // あなたのMamboの名前をセットしてください。
  var DRONE_NAME = "Mambo_546341";
  ```

+ winSample.jsを動かす

  ```
  $ node winSample.js
  ```
