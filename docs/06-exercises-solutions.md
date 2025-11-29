# 📒 練習問題の解答例

**各章の練習問題の解答 - 従来/JavaScript/TypeScript の3パターン**

---

## 01-react-basics の解答

### 問題1: Propsを使ったコンポーネント

**従来（PHP）:**
```php
<!-- user_card.php -->
<div class="user-card">
  <h3>
    <?php echo htmlspecialchars($name); ?>
    <?php if ($isAdmin): ?>
      <span class="admin-badge">管理者</span>
    <?php endif; ?>
  </h3>
  <p><?php echo htmlspecialchars($email); ?></p>
</div>

<!-- 使う側 -->
<?php 
$name = "太郎";
$email = "taro@example.com";
$isAdmin = true;
include 'user_card.php';
?>
```

**React（JavaScript）:**
```jsx
const UserCard = ({ name, email, isAdmin = false }) => {
  return (
    <div className="user-card">
      <h3>
        {name}
        {isAdmin && <span className="admin-badge">管理者</span>}
      </h3>
      <p>{email}</p>
    </div>
  );
};

// 使用例
<UserCard name="太郎" email="taro@example.com" isAdmin />
<UserCard name="花子" email="hanako@example.com" />
```

**React（TypeScript）:**
```tsx
interface UserCardProps {
  name: string;
  email: string;
  isAdmin?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, isAdmin = false }) => {
  return (
    <div className="user-card">
      <h3>
        {name}
        {isAdmin && <span className="admin-badge">管理者</span>}
      </h3>
      <p>{email}</p>
    </div>
  );
};

// 使用例
<UserCard name="太郎" email="taro@example.com" isAdmin />
<UserCard name="花子" email="hanako@example.com" />
```

### 問題2: リスト表示

**従来（PHP）:**
```php
<?php
$posts = [
  ['id' => 1, 'title' => 'はじめての投稿', 'date' => '2025-01-01'],
  ['id' => 2, 'title' => 'React入門', 'date' => '2025-01-15'],
  ['id' => 3, 'title' => 'TypeScript活用', 'date' => '2025-02-01'],
];
?>
<ul class="post-list">
<?php foreach ($posts as $post): ?>
  <li>
    <span class="post-date"><?php echo $post['date']; ?></span>
    <span class="post-title"><?php echo $post['title']; ?></span>
  </li>
<?php endforeach; ?>
</ul>
```

**React（JavaScript）:**
```jsx
const PostList = () => {
  const posts = [
    { id: 1, title: 'はじめての投稿', date: '2025-01-01' },
    { id: 2, title: 'React入門', date: '2025-01-15' },
    { id: 3, title: 'TypeScript活用', date: '2025-02-01' },
  ];

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <span className="post-date">{post.date}</span>
          <span className="post-title">{post.title}</span>
        </li>
      ))}
    </ul>
  );
};
```

**React（TypeScript）:**
```tsx
interface Post {
  id: number;
  title: string;
  date: string;
}

const PostList: React.FC = () => {
  const posts: Post[] = [
    { id: 1, title: 'はじめての投稿', date: '2025-01-01' },
    { id: 2, title: 'React入門', date: '2025-01-15' },
    { id: 3, title: 'TypeScript活用', date: '2025-02-01' },
  ];

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <span className="post-date">{post.date}</span>
          <span className="post-title">{post.title}</span>
        </li>
      ))}
    </ul>
  );
};
```

---

## 02-state-and-hooks の解答

### 問題1: トグルボタン

**従来（jQuery）:**
```html
<button id="toggle-btn" class="off">OFF</button>

<script>
let isOn = false;

$('#toggle-btn').click(function() {
  isOn = !isOn;
  $(this)
    .text(isOn ? 'ON' : 'OFF')
    .removeClass('on off')
    .addClass(isOn ? 'on' : 'off');
});
</script>
```

**React（JavaScript）:**
```jsx
const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(prev => !prev);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isOn ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};
```

**React（TypeScript）:**
```tsx
const ToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsOn(prev => !prev);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isOn ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};
```

### 問題2: タイマー

**従来（JavaScript）:**
```html
<div id="timer">0秒</div>

<script>
let seconds = 0;
const intervalId = setInterval(function() {
  seconds++;
  document.getElementById('timer').textContent = seconds + '秒';
}, 1000);

// ページ離脱時にクリア
window.addEventListener('beforeunload', function() {
  clearInterval(intervalId);
});
</script>
```

**React（JavaScript）:**
```jsx
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // クリーンアップ
    return () => clearInterval(intervalId);
  }, []);

  return <div>{seconds}秒</div>;
};
```

**React（TypeScript）:**
```tsx
const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{seconds}秒</div>;
};
```

### 問題3: useLocalStorage カスタムフック

**JavaScript:**
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return [storedValue, setValue];
}
```

**TypeScript:**
```tsx
function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return [storedValue, setValue];
}

// 使用例
const [name, setName] = useLocalStorage<string>('user_name', '');
const [count, setCount] = useLocalStorage<number>('count', 0);
```

---

## 03-typescript-for-react の解答

### 問題1: 型定義

```tsx
interface SocialLink {
  platform: string;
  url: string;
}

interface UserProfile {
  bio: string;
  website?: string;  // 省略可能
  socialLinks: SocialLink[];
}

interface User {
  id: number;
  name: string;
  email: string;
  profile: UserProfile;
}

// 使用例
const user: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
  profile: {
    bio: '自己紹介文',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/taro' },
      { platform: 'github', url: 'https://github.com/taro' }
    ]
  }
};
```

### 問題2: Alertコンポーネント

```tsx
interface AlertProps {
  type: 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const colors = {
    success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
    warning: { bg: '#fff3cd', border: '#ffeeba', text: '#856404' },
    error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' }
  };

  const style = colors[type];

  return (
    <div style={{
      backgroundColor: style.bg,
      border: `1px solid ${style.border}`,
      color: style.text,
      padding: '15px',
      borderRadius: '4px',
      position: 'relative'
    }}>
      <strong>{title}</strong>
      {message && <p style={{ margin: '5px 0 0' }}>{message}</p>}
      {onClose && (
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          ×
        </button>
      )}
    </div>
  );
};
```

---

## 04-project-walkthrough の解答

### 課題1: 新しいページを追加

**JavaScript:**
```jsx
// src/pages/GuestbookPage.jsx
import { useState } from 'react';

const GuestbookPage = () => {
  const [entries, setEntries] = useState(() => {
    const stored = localStorage.getItem('guestbook');
    return stored ? JSON.parse(stored) : [];
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      name,
      message,
      date: new Date().toLocaleDateString('ja-JP')
    };

    const newEntries = [newEntry, ...entries];
    setEntries(newEntries);
    localStorage.setItem('guestbook', JSON.stringify(newEntries));
    setName('');
    setMessage('');
  };

  return (
    <div>
      <h1>★ ゲストブック ★</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="お名前" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="メッセージ" />
        <button type="submit">書き込む</button>
      </form>
      {entries.map((entry) => (
        <div key={entry.id}>
          <strong>{entry.name}</strong> ({entry.date})
          <p>{entry.message}</p>
        </div>
      ))}
    </div>
  );
};

export default GuestbookPage;
```

**TypeScript:**
```tsx
// src/pages/GuestbookPage.tsx
import { useState } from 'react';

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

const GuestbookPage: React.FC = () => {
  const [entries, setEntries] = useState<GuestEntry[]>(() => {
    const stored = localStorage.getItem('guestbook');
    return stored ? JSON.parse(stored) : [];
  });
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name,
      message,
      date: new Date().toLocaleDateString('ja-JP')
    };

    const newEntries = [newEntry, ...entries];
    setEntries(newEntries);
    localStorage.setItem('guestbook', JSON.stringify(newEntries));
    setName('');
    setMessage('');
  };

  return (
    <div>
      <h1>★ ゲストブック ★</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="お名前" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="メッセージ" />
        <button type="submit">書き込む</button>
      </form>
      {entries.map((entry) => (
        <div key={entry.id}>
          <strong>{entry.name}</strong> ({entry.date})
          <p>{entry.message}</p>
        </div>
      ))}
    </div>
  );
};

export default GuestbookPage;
```

### 課題3: テーマ切り替え（カスタムフック）

**TypeScript:**
```tsx
// src/hooks/useTheme.ts
type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--color-bg', '#000033');
      root.style.setProperty('--color-text', '#cccccc');
    } else {
      root.style.setProperty('--color-bg', '#f0f0f0');
      root.style.setProperty('--color-text', '#333333');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};
```

---

## 05-backend-workers-d1 の解答

### 問題1: いいね機能

```javascript
// workers/src/routes/posts.js に追加

// POST /api/posts/:id/like
async function likePost(env, postId) {
  // いいね数を+1
  await env.DB.prepare(
    'UPDATE posts SET likes = likes + 1 WHERE id = ?'
  ).bind(postId).run();

  // 更新後の値を取得
  const post = await env.DB.prepare(
    'SELECT likes FROM posts WHERE id = ?'
  ).bind(postId).first();

  return new Response(
    JSON.stringify({ success: true, likes: post.likes }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

// schema.sql に追加
// ALTER TABLE posts ADD COLUMN likes INTEGER DEFAULT 0;
```

### 問題2: ページネーション

```javascript
// GET /api/posts?page=1&limit=10
async function getPostsWithPagination(env, url) {
  const page = parseInt(url.searchParams.get('page')) || 1;
  const limit = parseInt(url.searchParams.get('limit')) || 10;
  const offset = (page - 1) * limit;

  // 投稿を取得
  const { results } = await env.DB.prepare(
    'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).bind(limit, offset).all();

  // 総数を取得
  const { total } = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM posts'
  ).first();

  return new Response(JSON.stringify({
    posts: results,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }));
}
```

### 問題3: 検索機能

```javascript
// GET /api/posts/search?q=キーワード
async function searchPosts(env, url) {
  const query = url.searchParams.get('q') || '';
  
  if (!query.trim()) {
    return new Response(
      JSON.stringify({ error: '検索キーワードを入力してください' }),
      { status: 400 }
    );
  }

  const { results } = await env.DB.prepare(
    `SELECT * FROM posts 
     WHERE name LIKE ? OR content LIKE ?
     ORDER BY created_at DESC`
  ).bind(`%${query}%`, `%${query}%`).all();

  return new Response(JSON.stringify({ posts: results }));
}
```

---

## 💡 学習のヒント

### よくあるエラーと対処法

```tsx
// 1. "Cannot read property 'xxx' of undefined"
// → オプショナルチェーン(?.)を使う
user?.profile?.name

// 2. "Too many re-renders"
// → useEffectの依存配列を確認
useEffect(() => {
  // setState をここで呼ぶと無限ループになる可能性
}, []); // 依存配列を適切に設定

// 3. "Each child in a list should have a unique 'key' prop"
// → map で key を設定
items.map(item => <li key={item.id}>{item.name}</li>)
```

---

**お疲れ様でした！これで全ての学習ガイドを終了しました！🎉**

実際にコードを書いて、このプロジェクトを改造しながら理解を深めていきましょう！
