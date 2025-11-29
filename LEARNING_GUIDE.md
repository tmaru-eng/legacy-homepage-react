# 🎓 React学習ガイド

**HTML/CSS/JavaScript/LAMP時代のエンジニア向け**

このドキュメントは、従来のWeb開発（HTML/CSS/JavaScript、LAMP構成など）の経験者がReactを学ぶ際のガイドです。

---

## 🕰️ Web技術の変遷

| 時代 | 主な技術 | 特徴 |
|-----|---------|------|
| 1990s | HTML | 静的ページ、テーブルレイアウト |
| 2000s | HTML + CSS | 構造と見た目の分離 |
| 2005〜 | JavaScript | DOM操作、非同期通信（Ajax） |
| 2006〜 | jQuery | DOM操作の簡略化、クロスブラウザ対応 |
| 2000s〜 | PHP/Perl/Ruby | サーバーサイド、LAMP構成 |
| 2013〜 | **React/Vue/Angular** | **コンポーネント指向、SPA、仮想DOM** |
| 2017〜 | TypeScript | 型安全、大規模開発向け |

### パラダイムシフト：従来 → React

```
【従来の開発】
┌─────────────────────────────────────────────────────┐
│  サーバー（PHP）                                      │
│  ├─ HTMLを生成してブラウザに送信                      │
│  ├─ ページ遷移のたびにサーバーへリクエスト             │
│  └─ jQuery で DOM を直接操作                         │
└─────────────────────────────────────────────────────┘

【React以降】
┌─────────────────────────────────────────────────────┐
│  ブラウザ（React）              サーバー（API）       │
│  ├─ UIをコンポーネントで構築     ├─ JSONを返すだけ    │
│  ├─ 状態変化で自動再レンダリング  └─ フロントと分離    │
│  └─ ページ遷移もクライアント側で処理（SPA）           │
└─────────────────────────────────────────────────────┘
```

**このガイドでは「jQuery + PHP時代」と「React + TypeScript」の比較に焦点を当てます。**

jQuery + PHP は HTMLのみ〜サーバーサイドまでの技術を包括しており、多くの開発者が経験している「従来の開発スタイル」を代表しています。

---

## 📚 学習コンテンツ

| # | タイトル | 内容 | 難易度 |
|---|----------|------|--------|
| 01 | [React基礎編](./docs/01-react-basics.md) | コンポーネント、JSX、Props、イベント処理 | ⭐ 初級 |
| 02 | [State と Hooks編](./docs/02-state-and-hooks.md) | useState、useEffect、カスタムフック | ⭐⭐ 中級 |
| 03 | [TypeScript編](./docs/03-typescript-for-react.md) | 型定義、React + TypeScript | ⭐⭐ 中級 |
| 04 | [プロジェクト実践編](./docs/04-project-walkthrough.md) | 実際のコードを追いながら学ぶ | ⭐⭐⭐ 上級 |
| 05 | [バックエンド編](./docs/05-backend-workers-d1.md) | Cloudflare Workers + D1 | ⭐⭐ 中級 |
| 06 | [練習問題の解答](./docs/06-exercises-solutions.md) | 各章の練習問題の解答例（従来/JS/TS 3パターン） | - |

> 📝 **各章の例は従来のWeb開発（PHP/jQuery）→ JavaScript → TypeScript の3パターンで記載しています**

---

## 🚀 学習の進め方

### Step 1: 環境を整える

```bash
# リポジトリをクローン
git clone https://github.com/tmaru-eng/legacy-homepage-react.git
cd legacy-homepage-react

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### Step 2: 動いているものを触る

1. http://localhost:5173 でサイトを開く
2. 各ページを見て回る
3. BBSに投稿してみる（localStorageに保存される）
4. カウンターがどう動くか確認

### Step 3: コードを読む

```
推奨順序：
1. src/main.tsx          → アプリの起点
2. src/App.tsx           → ルーティング
3. src/components/Effects/BlinkText.tsx → 最もシンプルなコンポーネント
4. src/components/Counter/AccessCounter.tsx → 状態を使うコンポーネント
5. src/hooks/useCounter.ts → カスタムフック
6. src/pages/BBSPage.tsx → フォーム処理
```

### Step 4: 改造してみる

- 色を変えてみる
- 文言を変えてみる
- 新しいコンポーネントを追加してみる
- 新しいページを追加してみる

---

## 🔄 従来のWeb開発との比較

### ページ遷移

| 従来 | React |
|------|-------|
| `<a href="page.html">` でサーバーに新しいHTMLを要求 | クライアントサイドでコンポーネントを切り替え（SPA） |
| ページ全体がリロード | 必要な部分だけ更新 |

### 状態管理

| 従来 | React |
|------|-------|
| グローバル変数 + DOM直接操作 | useState + 自動再レンダリング |
| `document.getElementById('count').innerHTML = count` | `setCount(count + 1)` で自動更新 |

### コード再利用

| 従来 | React |
|------|-------|
| PHPの `include` やテンプレートエンジン | コンポーネントとして分割 |
| サーバーサイドで結合 | クライアントサイドで組み立て |

### イベント処理

| 従来 | React |
|------|-------|
| `<button onclick="handleClick()">` | `<button onClick={handleClick}>` |
| グローバル関数として定義 | コンポーネント内に定義 |

---

## 📖 このプロジェクトで学べる概念

### React基礎
- ✅ コンポーネントの作成と分割
- ✅ JSXの書き方
- ✅ Props（親→子へのデータ渡し）
- ✅ イベントハンドリング
- ✅ 条件分岐と繰り返し

### Hooks
- ✅ useState（状態管理）
- ✅ useEffect（副作用処理）
- ✅ useCallback（関数のメモ化）
- ✅ カスタムフック（ロジックの再利用）

### TypeScript
- ✅ 基本的な型（string, number, boolean）
- ✅ interface と type
- ✅ ジェネリクス
- ✅ React + TypeScript のパターン

### 実践的なパターン
- ✅ フォーム処理
- ✅ API連携（fetch）
- ✅ ローカルストレージ
- ✅ 環境変数による切り替え
- ✅ エラーハンドリング

---

## 🛠️ 開発ツール

### 必須
- **Node.js**: JavaScript実行環境
- **npm**: パッケージ管理
- **VS Code**: エディタ（推奨）

### 推奨拡張機能（VS Code）
- **ES7+ React/Redux/React-Native snippets**: スニペット
- **TypeScript Importer**: 自動インポート
- **Prettier**: コード整形
- **ESLint**: 静的解析

### ブラウザ拡張
- **React Developer Tools**: Reactコンポーネントの検査

---

## 📁 プロジェクト構造の解説

```
src/
├── main.tsx              # エントリーポイント（アプリの起点）
├── App.tsx               # ルーティング設定
├── types/                # TypeScript型定義
│   └── index.ts          # Post, Props等の型
├── hooks/                # カスタムフック（ロジックの再利用）
│   ├── useApi.ts         # API呼び出し
│   ├── useBBS.ts         # BBS機能
│   └── useCounter.ts     # カウンター機能
├── components/           # 再利用可能なUI部品
│   ├── Layout/           # 画面構造（Header, Sidebar等）
│   ├── Effects/          # 視覚効果（Marquee, Blink等）
│   ├── Counter/          # カウンター表示
│   ├── BBS/              # 掲示板機能
│   └── Common/           # 共通部品（Banner等）
├── pages/                # 各ページ
│   ├── TopPage.tsx       # トップページ
│   ├── BBSPage.tsx       # 掲示板ページ
│   └── ...
└── styles/               # CSS
    └── legacy.css        # レガシー風スタイル
```

---

## 💡 困ったときは

### よくあるエラー

| エラー | 原因 | 対処 |
|--------|------|------|
| `Cannot read property 'xxx' of undefined` | 存在しないプロパティにアクセス | オプショナルチェーン `?.` を使う |
| `Too many re-renders` | 無限ループ | useEffectの依存配列を確認 |
| `Each child should have a unique "key"` | リストのkey指定漏れ | map内で `key={id}` を追加 |

### デバッグ方法

```tsx
// コンソールで確認
console.log('状態:', { posts, loading });

// React DevToolsを使う
// Chrome拡張機能でコンポーネントの状態を確認
```

---

## 🔗 参考リソース

### 公式ドキュメント
- [React公式（日本語）](https://ja.react.dev/)
- [TypeScript公式](https://www.typescriptlang.org/docs/)
- [Vite公式（日本語）](https://ja.vitejs.dev/)

### 学習サイト
- [React Tutorial](https://ja.react.dev/learn)
- [TypeScript入門](https://typescriptbook.jp/)

### このプロジェクト関連
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)

---

**Happy Learning! 🚀**

各章のドキュメントで詳しく学んでいきましょう！
