# BookApp

ISBNを入力して書籍情報を登録できる、シンプルな蔵書管理アプリです。フロントエンドは Expo / React Native、バックエンドは Flask、データ保存には SQLite を使用しています。

## 主な機能

- ISBNからOpenBD APIを検索して書籍を登録
- 登録済み書籍の一覧表示
- タイトル・著者名での検索
- 書籍詳細の表示
  - 表紙画像
  - タイトル
  - 著者
  - 出版社
  - 出版日
  - ISBN
  - あらすじ
- 登録済み書籍の削除
- iOS / Android / Web での表示

## 技術スタック

### フロントエンド

- Expo
- React
- React Native
- React Native Web

### バックエンド

- Python
- Flask
- Flask-CORS
- SQLite
- OpenBD API

## ディレクトリ構成

```text
.
├── App.js
├── index.js
├── app.json
├── package.json
├── src
│   ├── api.js
│   ├── components
│   │   ├── BookCard.js
│   │   └── BookDetailModal.js
│   └── screens
│       ├── AddBookScreen.js
│       └── LibraryScreen.js
└── code
    └── server
        ├── app.py
        └── db.py
```

## セットアップ

### 1. フロントエンドの依存関係をインストール

```bash
npm install
```

### 2. バックエンドの依存関係をインストール

```bash
pip install flask flask-cors requests
```

必要に応じて、Pythonの仮想環境を作成してからインストールしてください。

```bash
python -m venv .venv
source .venv/bin/activate
pip install flask flask-cors requests
```

## 起動方法

### 1. Flask APIサーバーを起動

```bash
cd code/server
python app.py
```

サーバーは `http://localhost:5000` で起動します。初回起動時に `books.db` が自動作成されます。

### 2. ExpoアプリにAPI URLを設定

別ターミナルでプロジェクトルートに戻り、API URLを指定してExpoを起動します。

```bash
EXPO_PUBLIC_API_URL=http://localhost:5000 npm start
```

実機からローカルPC上のFlaskサーバーへ接続する場合は、`localhost` ではなくPCのローカルIPアドレスやngrokのURLを指定してください。

```bash
EXPO_PUBLIC_API_URL=https://your-ngrok-url.ngrok-free.app npm start
```

`src/api.js` では `EXPO_PUBLIC_API_URL` が未設定の場合、仮のngrok URLを参照するようになっています。

## Expoコマンド

```bash
npm start      # Expo開発サーバーを起動
npm run web    # Web版を起動
npm run ios    # iOSアプリを起動
npm run android # Androidアプリを起動
```

## API仕様

### 書籍一覧を取得

```http
GET /api/books
```

登録済みの書籍一覧を返します。

### ISBNから書籍を追加

```http
POST /api/books
Content-Type: application/json

{
  "isbn": "978XXXXXXXXXX"
}
```

OpenBD APIから書誌情報を取得し、SQLiteに保存します。

主なレスポンス:

- `201 Created`: 登録成功
- `400 Bad Request`: ISBN未指定
- `404 Not Found`: 書籍情報が見つからない
- `409 Conflict`: すでに登録済み

### 書籍を削除

```http
DELETE /api/books/:id
```

指定したIDの書籍を削除します。

## データベース

バックエンドはSQLiteを使用します。データベースファイルは、Flaskサーバーを起動したディレクトリに `books.db` として作成されます。

保存される主な項目:

- `id`
- `isbn`
- `title`
- `author`
- `publisher`
- `pubdate`
- `description`
- `image_url`

## 注意点

- OpenBDに登録されていないISBNは追加できません。
- 実機で確認する場合、スマートフォンからアクセス可能なAPI URLを `EXPO_PUBLIC_API_URL` に設定してください。
- AndroidでHTTP通信を使えるように、`app.json` では `usesCleartextTraffic` が有効になっています。
