# Meetings for Web

## 概要
アカウント制の掲示板アプリです。ReactとTypeScriptを使って開発しています。

スレッドやコメントを作成するにはサインインする必要があります。
サインインしていなくてもスレッドやコメントの閲覧・検索は可能です。

OSのテーマと連動してアプリのテーマが切り替わります。
レスポンシブ対応しており、画面のサイズが小さくても問題なく利用できます。

iOS版は[こちら](https://github.com/Yu357/Meetings-iOS)

## 主な使用技術
- React ver 18
- TypeScript ver 4
- Tailwind CSS ver 3
- Firebase SDK ver 9
  
## 環境構築手順
1. Node.jsをインストールしておく
    ```
    $ node -v
    v16.13.2
    ```
2. レポジトリをクローンする
    ```
    $ git clone https://github.com/Yu357/Meetings-Web
    ```

3. npmモジュールをインストール
    ```
    $ cd Meetings-Web
    $ npm i
    ```

4. `package.json`に登録しているコマンドでCSSファイルをビルドする
    ```
    $ npm run tailwind
    ```

5. プロジェクトを実行
    ```
    $ npm start
    ```

## スクリーンショット
<img width="1440" alt="スクリーンショット 2022-10-30 0 22 56" src="https://user-images.githubusercontent.com/65577595/198840392-81db60ca-f3cb-476c-a7f2-90e09fc9fab4.png">
<img width="1440" alt="スクリーンショット 2022-10-30 0 24 00" src="https://user-images.githubusercontent.com/65577595/198840406-a103b317-5b2a-438f-9d40-c68f31f688eb.png">

<img width="1440" alt="スクリーンショット 2022-10-30 0 26 06" src="https://user-images.githubusercontent.com/65577595/198840413-97f75506-5a0d-48db-8d6a-59c4a427acd1.png">
<img width="1440" alt="スクリーンショット 2022-10-30 0 26 45" src="https://user-images.githubusercontent.com/65577595/198840421-186aff86-120e-4b70-b88f-373485f4d031.png">


<div style="display: flex; justify-content: space-between;">
  <img style="display: block; width: 48%;" src="https://user-images.githubusercontent.com/65577595/198840452-e1ad44f3-c9f5-4a94-b938-9e2fd8d20951.png"/>
  <img style="display: block; width: 48%;" src="https://user-images.githubusercontent.com/65577595/198840455-9d74f016-40b8-4f88-8ff8-a02b196625b8.png"/>
</div>
