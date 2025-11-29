# 🕹️ レガシー風ホームページ再現プロジェクト

1990〜2000年代の個人ホームページを、モダンな技術（React + Cloudflare）で再現した**学習用プロジェクト**です。

## 🌐 デモサイト

https://legacy-homepage-react.pages.dev

---

## 📖 このプロジェクトについて

### 目的

- **React** の基礎を学ぶ
- **フロントエンド開発**（コンポーネント設計、ルーティング、状態管理）を学ぶ
- **バックエンド構築**（Cloudflare Workers + D1）を学ぶ
- **無料枠**で本格的なWebアプリをデプロイする方法を学ぶ

### なぜ「レガシー風ホームページ」？

1990〜2000年代のインターネットには、個人が作った個性的なホームページがたくさんありました。
GeoCities、COOL ONLINE、infoseekなどの無料ホームページサービスで、多くの人が自分だけのサイトを持っていました。

このプロジェクトでは、当時の懐かしい雰囲気を再現しながら、現代の技術を学びます。

---

## ✨ 実装機能

| 機能 | 説明 | 使用技術 |
|------|------|----------|
| レガシーUI | 星空背景、marquee、点滅テキスト、虹色テキスト | CSS Animation |
| アクセスカウンター | キリ番判定付き7セグメント風表示 | React + D1 |
| BBS（掲示板） | 投稿・削除機能、削除キー | React + Workers API |
| 2カラムレイアウト | フレーム風のサイドバー＋メイン | CSS Flexbox |
| 88x31バナー | 当時定番のバナーサイズ | CSS |

---

## 🛠️ 技術スタック

```
フロントエンド
├── React 19          # UIライブラリ
├── Vite              # ビルドツール
├── React Router      # ルーティング
└── CSS               # スタイリング（レガシー風）

バックエンド
├── Cloudflare Workers  # サーバーレスAPI
└── Cloudflare D1       # SQLiteデータベース

ホスティング
└── Cloudflare Pages    # 静的サイトホスティング
```

---

## 📁 プロジェクト構成

```
legacy-homepage-react/
├── src/
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── Layout/          # Header, Sidebar, Footer
│   │   ├── Counter/         # アクセスカウンター
│   │   ├── BBS/             # 掲示板（フォーム、リスト）
│   │   ├── Effects/         # Marquee, Blink, Rainbow
│   │   └── Common/          # Banner, UnderConstruction
│   ├── pages/               # ページコンポーネント
│   ├── hooks/               # カスタムフック（API通信）
│   └── styles/              # グローバルCSS
├── workers/                 # Cloudflare Workers API
│   ├── src/
│   │   ├── index.js         # APIルーター
│   │   ├── routes/          # posts.js, counter.js
│   │   └── utils/           # sanitize.js, hash.js
│   ├── schema.sql           # D1テーブル定義
│   └── wrangler.toml        # Workers設定
└── package.json
```

---

## 🚀 ローカルで動かす

### 1. クローン

```bash
git clone https://github.com/tmaru-eng/legacy-homepage-react.git
cd legacy-homepage-react
```

### 2. 依存関係インストール

```bash
npm install
```

### 3. 開発サーバー起動

```bash
npm run dev
```

http://localhost:5173 でサイトが開きます。

> ローカルではlocalStorageモードで動作します（API不要）

---

## ☁️ Cloudflareへデプロイ

### 前提条件

- Cloudflareアカウント（無料）
- GitHubアカウント

### Step 1: Wrangler CLIセットアップ

```bash
npm install -g wrangler
wrangler login
```

### Step 2: D1データベース作成

```bash
cd workers
wrangler d1 create legacy-homepage-db
```

出力された `database_id` を `workers/wrangler.toml` に設定

### Step 3: テーブル作成

```bash
wrangler d1 execute legacy-homepage-db --remote --file=./schema.sql
```

### Step 4: Workers APIデプロイ

```bash
wrangler deploy
```

### Step 5: Cloudflare Pagesセットアップ

1. https://dash.cloudflare.com → Workers & Pages
2. Create → Pages → Connect to Git
3. リポジトリを選択
4. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. 環境変数を追加:
   - `VITE_API_URL` = `https://your-worker.your-subdomain.workers.dev`

---

## 📚 学習ガイド

### このプロジェクトで学べること

#### React基礎
- コンポーネントの分割方法
- Props と State の使い分け
- useEffect でのライフサイクル管理
- カスタムフックの作成

#### フロントエンド設計
- ディレクトリ構成のベストプラクティス
- 再利用可能なコンポーネント設計
- CSS設計（BEM風、CSS変数）

#### バックエンド基礎
- REST API設計（GET, POST, DELETE）
- データベース操作（SQL）
- セキュリティ対策（XSS、ハッシュ化）

### 参考になるファイル

| 学習したいこと | 見るべきファイル |
|--------------|-----------------|
| Reactコンポーネント | `src/components/` |
| ルーティング | `src/App.jsx` |
| カスタムフック | `src/hooks/useBBS.js`, `useCounter.js` |
| API実装 | `workers/src/routes/` |
| CSS Animation | `src/components/Effects/Effects.css` |

### おすすめ学習リソース

- [React公式ドキュメント](https://react.dev/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)

---

## 💰 コスト

**すべて無料枠で運用可能！**

| サービス | 無料枠 |
|----------|--------|
| Cloudflare Pages | 無制限リクエスト、500ビルド/月 |
| Cloudflare Workers | 10万リクエスト/日 |
| Cloudflare D1 | 5GBストレージ |

---

## 🎨 レガシーデザイン要素一覧

当時のホームページでよく見られた要素を再現しています：

- ✅ 星空/宇宙柄のタイル背景
- ✅ marquee（横スクロールテキスト）
- ✅ 点滅テキスト（blink）
- ✅ 虹色テキスト
- ✅ キリ番カウンター
- ✅ フレーム風2カラムレイアウト
- ✅ 88x31バナー
- ✅ 工事中GIF風表示
- ✅ MIDI再生ボタン（UI再現）
- ✅ 「Netscape推奨」バナー
- ✅ 「NEW!」点滅バッジ
- ✅ 「キリ番踏んだ人はBBSで報告」

---

## 📄 ライセンス

MIT License

---

## 🙏 謝辞

このプロジェクトは、1990〜2000年代に個人ホームページを作っていた全ての人々へのオマージュです。

*懐かしい気持ちになっていただければ幸いです！*
