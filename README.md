# ドローン

Parrot Mambo Missionを使って遊びます

## 内容

+ 環境構築
+ ドローンを動かしてみる
+ 迷路探索プログラム
+ クレーンゲームプログラム

## 環境構築

#### gitコマンドを使えるようにしましょう

+ Macならターミナル
+ Windowsなら[git bash](https://git-for-windows.github.io/)

#### githubのアカウントを作りましょう

#### Node.jsをインストールしましょう

+ Macの場合
  + nodebrewなどを使うと良いと思います

+ Windowsの場合
  + [こちら](https://nodejs.org/en/)などからインストーラをダウンロードしてインストールする

#### プログラムを準備しましょう

```
git clone https://github.com/hiko2msp/play_with_parrot_mambo.git
cd play_with_parrot_mambo
bash setup.sh
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

+ move1.jsにドローンの名前を追記する(10行目を下記のように修正します)
  ```
  // あなたのMamboの名前をセットしてください。
  var DRONE_NAME = "Mambo_546341";
  ```

+ move1.jsを動かす

  ```
  $ node move1.js
  ```

  ドローンが飛んで、そのまま降りてくればOKです！
