# 📗 State と Hooks 編

**Reactの状態管理を理解する**

---

## 目次

1. [Stateとは](#stateとは)
2. [useState](#usestate)
3. [useEffect](#useeffect)
4. [カスタムフック](#カスタムフック)
5. [その他のフック](#その他のフック)

---

## Stateとは

### 従来の方法（JavaScript + DOM操作）

```html
<div id="count">0</div>
<button onclick="increment()">+1</button>

<script>
let count = 0;  // グローバル変数

function increment() {
  count++;
  document.getElementById('count').textContent = count;  // DOM直接操作
}
</script>
```

**問題点:**
- グローバル変数は管理が難しい
- DOM操作を忘れるとUIが更新されない
- どこで何が変わったか追跡しづらい

### React（JavaScript）

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);  // stateを更新するとUIも自動更新！
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

### React（TypeScript）

```tsx
import { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
    </div>
  );
};
```

**メリット:**
- コンポーネント内で状態を管理
- 状態が変わると自動的にUIが更新される
- TypeScriptで型安全

---

## useState

### 基本構文

```
const [状態変数, 更新関数] = useState(初期値);
```

### 様々な型のState

**JavaScript:**

```jsx
// 数値
const [count, setCount] = useState(0);

// 文字列
const [name, setName] = useState('');

// 真偽値
const [isOpen, setIsOpen] = useState(false);

// 配列
const [items, setItems] = useState([]);

// オブジェクト
const [user, setUser] = useState({
  name: '',
  email: ''
});
```

**TypeScript:**

```tsx
// 数値（型推論される）
const [count, setCount] = useState(0);

// 文字列
const [name, setName] = useState('');

// 真偽値
const [isOpen, setIsOpen] = useState(false);

// 配列（型を明示）
const [items, setItems] = useState<string[]>([]);

// オブジェクト（interfaceを使う）
interface User {
  name: string;
  email: string;
}
const [user, setUser] = useState<User>({ name: '', email: '' });

// null許容
const [data, setData] = useState<User | null>(null);
```

### 更新の注意点

```jsx
// ❌ NG: 直接変更してはいけない
count = count + 1;           // 動かない
user.name = '太郎';          // 動かない

// ✅ OK: 更新関数を使う
setCount(count + 1);
setUser({ ...user, name: '太郎' });  // スプレッド構文でコピー
```

### 前の値を使った更新

```jsx
// 連続で更新する場合は関数形式を使う
const handleMultipleClicks = () => {
  // ❌ NG: 3回呼んでも1しか増えない
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);

  // ✅ OK: 関数形式なら3増える
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

### 配列・オブジェクトの更新パターン

**JavaScript / TypeScript 共通:**

```jsx
// 配列に追加
setItems([...items, 'バナナ']);

// 配列から削除
setItems(items.filter(item => item !== 'りんご'));

// 配列を更新
setItems(items.map(item => 
  item === 'みかん' ? 'オレンジ' : item
));

// オブジェクトの一部を更新
setUser({ ...user, name: '次郎' });

// ネストしたオブジェクト
setUser({
  ...user,
  profile: { ...user.profile, city: '大阪' }
});
```

---

## useEffect

副作用（データ取得、タイマー、DOM操作）を扱うフック。

### 従来の方法（jQuery）

```javascript
$(document).ready(function() {
  // ページ読み込み時に実行
  $.ajax({
    url: '/api/data',
    success: function(data) {
      $('#result').html(data);
    }
  });
});
```

### React（JavaScript）

```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // コンポーネントがマウントされた時に実行
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);  // 空配列 = 初回のみ実行

  if (loading) return <p>読み込み中...</p>;
  return <div>{data}</div>;
}
```

### React（TypeScript）

```tsx
import { useState, useEffect } from 'react';

interface ApiData {
  id: number;
  name: string;
}

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await fetch('/api/data');
      const json: ApiData = await res.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  return <div>{data?.name}</div>;
};
```

### 依存配列のパターン

```jsx
// パターン1: 初回マウント時のみ実行
useEffect(() => {
  console.log('初回のみ');
}, []);

// パターン2: 特定の値が変わった時に実行
useEffect(() => {
  console.log('countが変わった:', count);
}, [count]);

// パターン3: 毎回レンダリング後に実行（通常は使わない）
useEffect(() => {
  console.log('毎回実行');
});
```

### クリーンアップ

**JavaScript:**

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // クリーンアップ：コンポーネント破棄時に実行
    return () => clearInterval(id);
  }, []);

  return <div>{seconds}秒</div>;
}
```

**TypeScript:**

```tsx
const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const id: NodeJS.Timeout = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return (): void => {
      clearInterval(id);
    };
  }, []);

  return <div>{seconds}秒</div>;
};
```

---

## カスタムフック

ロジックを再利用可能な関数にまとめる。

### なぜカスタムフック？

```jsx
// ❌ 悪い例：同じロジックを複数コンポーネントにコピペ
function ComponentA() {
  const [data, setData] = useState(null);
  useEffect(() => { /* 同じ処理 */ }, []);
}

function ComponentB() {
  const [data, setData] = useState(null);
  useEffect(() => { /* 同じ処理をコピペ */ }, []);
}
```

### カスタムフックで解決

**JavaScript:**

```jsx
// hooks/useData.js
function useData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
}

// 使う側
function ComponentA() {
  const { data, loading } = useData('/api/users');
}
```

**TypeScript:**

```tsx
// hooks/useData.ts
interface UseDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useData<T>(url: string): UseDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((json: T) => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// 使う側
interface User {
  id: number;
  name: string;
}

const Component: React.FC = () => {
  const { data, loading } = useData<User[]>('/api/users');
};
```

### カスタムフックのルール

1. **名前は `use` で始める** → `useCounter`, `useBBS`
2. **他のフックを使える** → `useState`, `useEffect` など
3. **値を返す** → オブジェクト or 配列

---

## その他のフック

### useCallback（関数のメモ化）

```tsx
// 依存配列が変わらない限り同じ関数を再利用
const handleClick = useCallback(() => {
  console.log('count:', count);
}, [count]);
```

### useMemo（計算結果のメモ化）

```tsx
// 依存配列が変わった時だけ再計算
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

### useRef（DOM参照・値の保持）

**JavaScript:**

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>フォーカス</button>
    </>
  );
}
```

**TypeScript:**

```tsx
const TextInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>フォーカス</button>
    </>
  );
};
```

---

## 🎯 練習問題

### 問題1: トグルボタン

クリックで「ON」↔「OFF」を切り替えるボタンを作成。

### 問題2: タイマー

毎秒カウントアップするタイマーを作成。クリーンアップも実装。

### 問題3: useLocalStorage

localStorageと同期するカスタムフックを作成：

```tsx
const [name, setName] = useLocalStorage('user_name', '');
```

---

**次へ: [03-typescript-for-react.md](./03-typescript-for-react.md)**
