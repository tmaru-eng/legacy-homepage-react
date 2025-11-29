# 📕 プロジェクト実践編

**実際のコードを追いながら学ぶ**

---

## 目次

1. [アプリケーションの起動フロー](#アプリケーションの起動フロー)
2. [コンポーネント設計](#コンポーネント設計)
3. [状態管理の実装](#状態管理の実装)
4. [API連携](#api連携)
5. [スタイリング](#スタイリング)

---

## アプリケーションの起動フロー

### 従来の方法（PHP）

```php
<!-- index.php -->
<?php include 'header.php'; ?>
<?php include 'sidebar.php'; ?>

<?php 
// ページ分岐
$page = $_GET['page'] ?? 'top';
switch ($page) {
    case 'profile': include 'profile.php'; break;
    case 'bbs': include 'bbs.php'; break;
    default: include 'top.php';
}
?>

<?php include 'footer.php'; ?>
```

### React（TypeScript）

**1. エントリーポイント**

`index.html`:
```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

`src/main.tsx`:
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <App />
    </StrictMode>
  );
```

**2. ルーティング設定**

`src/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TopPage, ProfilePage, BBSPage, LinksPage, WipPage } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/bbs" element={<BBSPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/wip" element={<WipPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
```

**ポイント:**
- `BrowserRouter`: ブラウザのURLと同期
- `Routes` / `Route`: URLパスとコンポーネントの対応
- `Layout`: 全ページ共通のレイアウト
- `path="*"`: 404ページ（マッチしないURL）

---

## コンポーネント設計

### レイアウト構造

```
┌─────────────────────────────────────┐
│            Header                    │
│  ┌──────────┬───────────────────┐   │
│  │          │                    │   │
│  │ Sidebar  │    Content Area    │   │
│  │          │    (各ページ)       │   │
│  │          │                    │   │
│  └──────────┴───────────────────┘   │
│            Footer                    │
└─────────────────────────────────────┘
```

**JavaScript:**

```jsx
// Layout.jsx
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
```

**TypeScript:**

```tsx
// Layout.tsx
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import type { LayoutProps } from '../../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
```

### コンポーネントの分類

| 種類 | 場所 | 役割 | 例 |
|------|------|------|-----|
| **Pages** | `src/pages/` | 各ページのコンテンツ | TopPage, BBSPage |
| **Layout** | `src/components/Layout/` | 共通レイアウト | Header, Sidebar |
| **Effects** | `src/components/Effects/` | 視覚効果 | Marquee, BlinkText |
| **Common** | `src/components/Common/` | 汎用部品 | Banner, UnderConstruction |
| **Feature** | `src/components/BBS/` など | 特定機能 | PostForm, PostList |

### Propsの流れ

**JavaScript:**

```jsx
// 親（BBSPage）→ 子（PostForm）へデータを渡す
const BBSPage = () => {
  const { addPost } = useBBS();

  return (
    <PostForm onSubmit={addPost} />
  );
};

// 子（PostForm）は受け取った関数を呼び出す
const PostForm = ({ onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };
};
```

**TypeScript:**

```tsx
// 親（BBSPage）→ 子（PostForm）へデータを渡す
const BBSPage: React.FC = () => {
  const { addPost } = useBBS();

  return (
    <PostForm onSubmit={addPost} />
  );
};

// 子（PostForm）は受け取った関数を呼び出す
interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<ApiResult>;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(formData);
  };
};
```

---

## 状態管理の実装

### 状態の種類

| 種類 | 管理場所 | 例 |
|------|----------|-----|
| **UIの状態** | コンポーネント内 | フォーム入力値、モーダル開閉 |
| **アプリの状態** | カスタムフック | 投稿一覧、カウンター |
| **永続化データ** | localStorage / API | ユーザー設定、投稿データ |

### フォームの状態管理

**JavaScript:**

```jsx
const PostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    deleteKey: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      alert('名前と本文は必須です');
      return;
    }
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData({ name: '', content: '', deleteKey: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
    </form>
  );
};
```

**TypeScript:**

```tsx
interface PostFormData {
  name: string;
  content: string;
  deleteKey: string;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PostFormData>({
    name: '',
    content: '',
    deleteKey: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      alert('名前と本文は必須です');
      return;
    }
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData({ name: '', content: '', deleteKey: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
    </form>
  );
};
```

### カスタムフックでの状態管理

**JavaScript:**

```jsx
// useBBS.js
export const useBBS = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      if (isApiEnabled()) {
        const data = await apiCall('/api/posts');
        setPosts(data);
      } else {
        const stored = localStorage.getItem('bbs_posts');
        if (stored) setPosts(JSON.parse(stored));
      }
    } catch (err) {
      setError('読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, addPost, deletePost };
};
```

**TypeScript:**

```tsx
// useBBS.ts
interface UseBBSReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (data: PostFormData) => Promise<ApiResult>;
  deletePost: (id: string, deleteKey: string) => Promise<ApiResult>;
}

export const useBBS = (): UseBBSReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (isApiEnabled()) {
        const data = await apiCall<Post[]>('/api/posts');
        setPosts(data);
      } else {
        const stored = localStorage.getItem('bbs_posts');
        if (stored) setPosts(JSON.parse(stored));
      }
    } catch (err) {
      setError('読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, addPost, deletePost };
};
```

---

## API連携

### 従来の方法（jQuery + PHP）

```javascript
// フロントエンド (jQuery)
$.ajax({
  url: '/bbs.php',
  method: 'POST',
  data: { name: '太郎', content: 'こんにちは' },
  success: function(response) {
    location.reload();  // ページ全体を再読み込み
  }
});
```

```php
// バックエンド (bbs.php)
<?php
$name = $_POST['name'];
$content = $_POST['content'];

$pdo = new PDO('mysql:host=localhost;dbname=mydb', 'user', 'pass');
$stmt = $pdo->prepare("INSERT INTO posts (name, content) VALUES (?, ?)");
$stmt->execute([$name, $content]);

header('Location: /bbs.php');
```

### React + Workers API

**JavaScript:**

```jsx
// useApi.js
const API_URL = import.meta.env.VITE_API_URL;

export const isApiEnabled = () => !!API_URL;

export const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
};
```

**TypeScript:**

```tsx
// useApi.ts
const API_URL = import.meta.env.VITE_API_URL;

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const isApiEnabled = (): boolean => !!API_URL;

export const apiCall = async <T>(
  endpoint: string, 
  options: FetchOptions = {}
): Promise<T> => {
  if (!isApiEnabled()) {
    throw new Error('API is not enabled');
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
};
```

### APIとlocalStorageの使い分け

```tsx
// 本番（API）とローカル開発（localStorage）を自動切り替え
const addPost = async (data: PostFormData): Promise<ApiResult> => {
  try {
    if (isApiEnabled()) {
      // 本番環境：Cloudflare Workers API経由
      await apiCall('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ name: data.name, content: data.content })
      });
      await fetchPosts();  // 一覧を再取得
    } else {
      // ローカル開発：localStorage
      const newPost: Post = {
        id: Date.now().toString(),
        name: data.name,
        content: data.content,
        createdAt: new Date().toISOString()
      };
      const newPosts = [newPost, ...posts];
      localStorage.setItem('bbs_posts', JSON.stringify(newPosts));
      setPosts(newPosts);
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: '投稿に失敗しました' };
  }
};
```

---

## スタイリング

### 従来の方法（CSS + PHP）

```php
<!-- style.css を別ファイルで読み込み -->
<link rel="stylesheet" href="style.css">

<!-- インラインスタイル -->
<div style="color: red;">テキスト</div>
```

### React のスタイリング

**CSS変数で共通の値を定義:**

```css
/* src/styles/legacy.css */
:root {
  --color-bg: #000033;
  --color-text: #cccccc;
  --color-link: #00ffff;
  --font-retro: 'MS Gothic', 'MS ゴシック', monospace;
}

body {
  background-color: var(--color-bg);
  background-image: url('/images/stars.gif');
  background-repeat: repeat;
}

a:link { color: var(--color-link); }
a:visited { color: var(--color-visited); }
```

**コンポーネント内スタイル:**

```tsx
// インラインスタイル（動的な値に便利）
<div style={{ 
  color: isError ? 'red' : 'green',
  padding: `${spacing}px`
}}>

// classNameで切り替え
<button className={`btn ${isActive ? 'btn-active' : ''}`}>

// 複数クラスの結合
<div className={['card', isHighlight && 'highlight'].filter(Boolean).join(' ')}>
```

### CSSアニメーション

```css
/* src/components/Effects/Effects.css */

/* Marquee（横スクロール） */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-content {
  animation: marquee 20s linear infinite;
}

/* 点滅 */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.blink-text {
  animation: blink 0.5s step-end infinite;
}
```

---

## 🎯 このプロジェクトを改造してみよう

### 課題1: 新しいページを追加

「ゲストブック」ページを追加してみましょう：
1. `src/pages/GuestbookPage.tsx` を作成
2. `src/App.tsx` にルートを追加
3. `src/components/Layout/Sidebar.tsx` にリンクを追加

### 課題2: コンポーネントを追加

訪問者の名前を表示する「ウェルカムメッセージ」コンポーネントを作成：
1. localStorageに名前を保存
2. 初回訪問時は名前入力フォームを表示
3. 2回目以降は「おかえり、〇〇さん！」と表示

### 課題3: カスタムフックを作成

テーマ切り替え（ダークモード）のカスタムフックを作成：
1. `useTheme` カスタムフック
2. 'light' | 'dark' の状態管理
3. localStorageで永続化
4. CSS変数を動的に変更

---

## 📁 ファイル一覧と役割

```
src/
├── main.tsx                 # エントリーポイント
├── App.tsx                  # ルーティング設定
├── types/
│   └── index.ts             # 型定義（Post, Props等）
├── hooks/
│   ├── useApi.ts            # API呼び出し共通処理
│   ├── useBBS.ts            # BBS機能（投稿CRUD）
│   ├── useCounter.ts        # カウンター機能
│   └── index.ts             # エクスポート
├── components/
│   ├── Layout/
│   │   ├── Header.tsx       # サイトヘッダー
│   │   ├── Sidebar.tsx      # ナビゲーション
│   │   ├── Footer.tsx       # フッター
│   │   └── Layout.tsx       # レイアウト統合
│   ├── Effects/
│   │   ├── Marquee.tsx      # 横スクロール
│   │   ├── BlinkText.tsx    # 点滅テキスト
│   │   └── RainbowText.tsx  # 虹色テキスト
│   ├── Counter/
│   │   └── AccessCounter.tsx # カウンター表示
│   ├── BBS/
│   │   ├── PostForm.tsx     # 投稿フォーム
│   │   └── PostList.tsx     # 投稿一覧
│   └── Common/
│       ├── Banner.tsx       # 88x31バナー
│       └── UnderConstruction.tsx
├── pages/
│   ├── TopPage.tsx          # トップページ
│   ├── ProfilePage.tsx      # プロフィール
│   ├── BBSPage.tsx          # 掲示板
│   ├── LinksPage.tsx        # リンク集
│   └── WipPage.tsx          # 工事中
└── styles/
    └── legacy.css           # グローバルスタイル
```

---

**次へ: [05-backend-workers-d1.md](./05-backend-workers-d1.md)**
