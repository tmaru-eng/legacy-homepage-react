# 📘 React基礎編

**従来のWeb開発からReactへ**

---

## 目次

1. [コンポーネントとは](#コンポーネントとは)
2. [JSXの書き方](#jsxの書き方)
3. [Props（プロパティ）](#propsプロパティ)
4. [イベント処理](#イベント処理)
5. [条件分岐と繰り返し](#条件分岐と繰り返し)

---

## コンポーネントとは

### 従来の方法（PHP）

```php
<!-- header.php -->
<header>
  <h1>サイトタイトル</h1>
  <nav>メニュー</nav>
</header>

<!-- index.php -->
<?php include 'header.php'; ?>
<main>コンテンツ</main>
<?php include 'footer.php'; ?>
```

### React（JavaScript）

```jsx
// Header.jsx
function Header() {
  return (
    <header>
      <h1>サイトタイトル</h1>
      <nav>メニュー</nav>
    </header>
  );
}

// App.jsx
import Header from './Header';

function App() {
  return (
    <div>
      <Header />
      <main>コンテンツ</main>
    </div>
  );
}
```

### React（TypeScript）

```tsx
// Header.tsx
const Header: React.FC = () => {
  return (
    <header>
      <h1>サイトタイトル</h1>
      <nav>メニュー</nav>
    </header>
  );
};

// App.tsx
import Header from './Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main>コンテンツ</main>
    </div>
  );
};
```

### 💡 比較表

| 項目 | 従来（PHP） | React（JS） | React（TS） |
|-----|------------|-------------|-------------|
| ファイル分割 | include/require | import | import |
| 実行場所 | サーバー | ブラウザ | ブラウザ |
| 型チェック | なし | なし | あり |
| 拡張子 | .php | .jsx | .tsx |

---

## JSXの書き方

JSXはJavaScriptの中にHTMLのような記法で書ける構文です。

### 基本ルール：1つの親要素で囲む

**JavaScript / TypeScript 共通:**

```jsx
// ❌ NG: 複数の要素を直接返せない
function Bad() {
  return (
    <h1>タイトル</h1>
    <p>本文</p>
  );
}

// ✅ OK: divで囲む
function Good() {
  return (
    <div>
      <h1>タイトル</h1>
      <p>本文</p>
    </div>
  );
}

// ✅ OK: Fragment（<>）で囲む（余計なdivを作りたくない時）
function AlsoGood() {
  return (
    <>
      <h1>タイトル</h1>
      <p>本文</p>
    </>
  );
}
```

### 属性の違い

| HTML | JSX |
|------|-----|
| `class="container"` | `className="container"` |
| `for="name"` | `htmlFor="name"` |
| `onclick="fn()"` | `onClick={fn}` |

### JavaScriptを埋め込む

**JavaScript:**

```jsx
function Greeting() {
  const name = '太郎';
  const today = new Date().toLocaleDateString();
  
  return (
    <div>
      <p>こんにちは、{name}さん！</p>
      <p>今日は {today} です</p>
      <p>1 + 1 = {1 + 1}</p>
    </div>
  );
}
```

**TypeScript:**

```tsx
const Greeting: React.FC = () => {
  const name: string = '太郎';
  const today: string = new Date().toLocaleDateString();
  
  return (
    <div>
      <p>こんにちは、{name}さん！</p>
      <p>今日は {today} です</p>
      <p>1 + 1 = {1 + 1}</p>
    </div>
  );
};
```

### スタイルの書き方

```jsx
// HTML:  <div style="color: red; font-size: 16px;">
// JSX:
<div style={{ 
  color: 'red', 
  fontSize: '16px',       // ケバブケース → キャメルケース
  backgroundColor: '#000' // background-color → backgroundColor
}}>
```

---

## Props（プロパティ）

親コンポーネントから子コンポーネントにデータを渡す仕組み。

### 従来の方法（PHP）

```php
<!-- card.php -->
<div class="card">
  <h2><?php echo $title; ?></h2>
  <p><?php echo $content; ?></p>
</div>

<!-- 使う側 -->
<?php 
$title = "お知らせ";
$content = "本日は晴天なり";
include 'card.php';
?>
```

### React（JavaScript）

```jsx
// Card.jsx - 子コンポーネント
function Card({ title, content }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

// App.jsx - 親コンポーネント
function App() {
  return (
    <Card title="お知らせ" content="本日は晴天なり" />
  );
}
```

### React（TypeScript）

```tsx
// Card.tsx - 型定義付き
interface CardProps {
  title: string;
  content: string;
  isHighlight?: boolean;  // ? は省略可能
}

const Card: React.FC<CardProps> = ({ title, content, isHighlight = false }) => {
  return (
    <div className={`card ${isHighlight ? 'highlight' : ''}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

// App.tsx
const App: React.FC = () => {
  return (
    <>
      <Card title="お知らせ" content="本日は晴天なり" />
      <Card title="重要" content="メンテナンス予定" isHighlight />
    </>
  );
};
```

### children（子要素を受け取る）

**JavaScript:**

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// 使う側
<Card title="お知らせ">
  <p>本日は晴天なり</p>
  <p>明日も晴れるでしょう</p>
</Card>
```

**TypeScript:**

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
};
```

---

## イベント処理

### 従来の方法（jQuery）

```html
<button id="myButton">クリック</button>

<script>
$('#myButton').click(function() {
  alert('クリックされました');
});
</script>
```

### React（JavaScript）

```jsx
function Button() {
  const handleClick = () => {
    alert('クリックされました');
  };

  return (
    <button onClick={handleClick}>クリック</button>
  );
}
```

### React（TypeScript）

```tsx
const Button: React.FC = () => {
  const handleClick = (): void => {
    alert('クリックされました');
  };

  return (
    <button onClick={handleClick}>クリック</button>
  );
};
```

### フォームのイベント処理

**JavaScript:**

```jsx
function Form() {
  const handleChange = (e) => {
    console.log('入力値:', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('送信処理');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">送信</button>
    </form>
  );
}
```

**TypeScript:**

```tsx
const Form: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('入力値:', e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('送信処理');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">送信</button>
    </form>
  );
};
```

### イベント名の違い

| HTML | React |
|------|-------|
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |
| `onmouseover` | `onMouseOver` |

---

## 条件分岐と繰り返し

### 従来の方法（PHP）

```php
<!-- 条件分岐 -->
<?php if ($isLoggedIn): ?>
  <p>ようこそ！</p>
<?php else: ?>
  <p>ログインしてください</p>
<?php endif; ?>

<!-- 繰り返し -->
<ul>
<?php foreach ($items as $item): ?>
  <li><?php echo $item['name']; ?></li>
<?php endforeach; ?>
</ul>
```

### React（JavaScript）

```jsx
// 条件分岐
function UserStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>ようこそ！</p>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
}

// 繰り返し
function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### React（TypeScript）

```tsx
// 条件分岐
interface UserStatusProps {
  isLoggedIn: boolean;
}

const UserStatus: React.FC<UserStatusProps> = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <p>ようこそ！</p>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
};

// 繰り返し
interface Item {
  id: number;
  name: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

### 条件付き表示のパターン

```jsx
// パターン1: 三項演算子（条件 ? A : B）
{isLoggedIn ? <p>ログイン中</p> : <p>未ログイン</p>}

// パターン2: &&演算子（条件がtrueの時だけ表示）
{count > 0 && <span className="badge">{count}</span>}

// パターン3: 早期リターン
function Content({ isLoading }) {
  if (isLoading) {
    return <p>読み込み中...</p>;
  }
  return <p>コンテンツ</p>;
}
```

### 💡 keyが必要な理由

```jsx
// ❌ NG: indexをkeyにしない（追加/削除で問題が起きる）
items.map((item, index) => <li key={index}>{item.name}</li>)

// ✅ OK: 一意なIDをkeyにする
items.map((item) => <li key={item.id}>{item.name}</li>)
```

---

## 🎯 練習問題

### 問題1: Propsを使ったコンポーネント

ユーザー情報を表示する `UserCard` コンポーネントを作成してください：
- Props: `name`（必須）, `email`（必須）, `isAdmin`（省略可能）
- `isAdmin` がtrueの場合、「管理者」バッジを表示

### 問題2: リスト表示

以下のデータを表示するコンポーネントを作成してください：

```tsx
const posts = [
  { id: 1, title: 'はじめての投稿', date: '2025-01-01' },
  { id: 2, title: 'React入門', date: '2025-01-15' },
  { id: 3, title: 'TypeScript活用', date: '2025-02-01' },
];
```

---

**次へ: [02-state-and-hooks.md](./02-state-and-hooks.md)**
