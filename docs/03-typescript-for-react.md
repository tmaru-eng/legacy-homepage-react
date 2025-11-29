# 📙 TypeScript for React 編

**JavaScript から TypeScript へステップアップ**

---

## 目次

1. [なぜTypeScript？](#なぜtypescript)
2. [基本の型](#基本の型)
3. [React + TypeScript](#react--typescript)
4. [よくあるパターン](#よくあるパターン)
5. [型定義ファイル](#型定義ファイル)

---

## なぜTypeScript？

TypeScriptはJavaScriptに「型」を追加した言語です。JavaScriptがわかれば、少しずつ覚えられます。

### JavaScript の問題

```javascript
// JavaScript - 型がないので何でも渡せてしまう
function greet(user) {
  return 'こんにちは、' + user.name + 'さん！';
}

// 実行時にエラー（user.nameがundefined）
greet({ username: '太郎' });  // 「こんにちは、undefinedさん！」
// 動くけど結果がおかしい！気づきにくいバグの原因
```

### TypeScript で解決

```typescript
// TypeScript - 型を定義することで事前にエラーを検出
interface User {
  name: string;
}

function greet(user: User): string {
  return 'こんにちは、' + user.name + 'さん！';
}

// コンパイル時（書いている時）にエラーを検出！
greet({ username: '太郎' });  
// ❌ エラー: Property 'name' is missing in type '{ username: string; }'
```

### メリット

| 項目 | JavaScript | TypeScript |
|------|------------|------------|
| エラー検出 | 実行時 | 書いている時 |
| コード補完 | 限定的 | 充実 |
| リファクタリング | 手動で確認 | 自動で検出 |
| ドキュメント | 別途必要 | 型が説明になる |

---

## 基本の型

### プリミティブ型

```typescript
// 文字列
let name: string = '太郎';

// 数値
let age: number = 25;

// 真偽値
let isActive: boolean = true;

// null / undefined
let empty: null = null;
let notDefined: undefined = undefined;
```

### 配列

```typescript
// 方法1: 型[]
let numbers: number[] = [1, 2, 3];
let names: string[] = ['太郎', '花子'];

// 方法2: Array<型>
let items: Array<string> = ['りんご', 'みかん'];
```

### オブジェクト（interface）

```typescript
// interfaceで型を定義
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // ?は省略可能
}

const user: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com'
  // ageは省略可能なので書かなくてもOK
};
```

### type vs interface

```typescript
// type: 型エイリアス（別名をつける）
type ID = string | number;  // Union型（どちらか）
type Status = 'pending' | 'success' | 'error';  // リテラル型

// interface: オブジェクトの形を定義
interface User {
  id: ID;
  status: Status;
}

// どちらを使う？
// - オブジェクトの形 → interface
// - Union型や複雑な型 → type
```

### Union型とリテラル型

```typescript
// Union型: A または B
let value: string | number;
value = 'hello';  // OK
value = 42;       // OK
value = true;     // ❌ エラー

// リテラル型: 特定の値のみ
type ButtonSize = 'small' | 'medium' | 'large';

function Button({ size }: { size: ButtonSize }) {
  // sizeは 'small', 'medium', 'large' のどれか
}

Button({ size: 'small' });   // OK
Button({ size: 'huge' });    // ❌ エラー
```

### ジェネリクス

```typescript
// T は「何かの型」を表すプレースホルダー
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 使う時に型が決まる
first<number>([1, 2, 3]);      // number | undefined
first<string>(['a', 'b']);     // string | undefined
first([true, false]);          // 型推論でboolean | undefined
```

---

## React + TypeScript

### コンポーネントの型定義

```typescript
// 方法1: React.FC（Function Component）
interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return <div>こんにちは、{name}さん！</div>;
};

// 方法2: 普通の関数（こちらの方が最近は推奨）
function Greeting2({ name, age }: GreetingProps) {
  return <div>こんにちは、{name}さん！</div>;
}
```

### children の型

```typescript
interface CardProps {
  title: string;
  children: React.ReactNode;  // 何でも受け取れる
}

// React.ReactNode は以下を含む:
// - 文字列
// - 数値
// - JSX要素
// - 配列
// - null / undefined
// - boolean
```

### イベントの型

```typescript
// クリックイベント
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('クリック位置:', e.clientX, e.clientY);
};

// 入力イベント
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('入力値:', e.target.value);
};

// フォーム送信
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// キーボードイベント
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    // Enter押下時の処理
  }
};
```

### useState の型

```typescript
// 自動推論される場合
const [count, setCount] = useState(0);  // number
const [name, setName] = useState('');   // string

// 明示的に指定（初期値がnullの場合など）
const [user, setUser] = useState<User | null>(null);

// 配列やオブジェクト
const [items, setItems] = useState<string[]>([]);
const [form, setForm] = useState<FormData>({
  name: '',
  email: ''
});
```

### useRef の型

```typescript
// DOM要素への参照
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// 値の保持（再レンダリングしない）
const countRef = useRef<number>(0);
```

---

## よくあるパターン

### APIレスポンスの型

```typescript
// レスポンスの型を定義
interface Post {
  id: string;
  name: string;
  content: string;
  created_at: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 使用例
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/api/posts');
  const posts: Post[] = await response.json();
  return posts;
}
```

### カスタムフックの型

```typescript
// 戻り値の型を定義
interface UseCounterReturn {
  count: number;
  loading: boolean;
  error: string | null;
  increment: () => Promise<void>;
}

function useCounter(): UseCounterReturn {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const increment = async () => {
    setCount(prev => prev + 1);
  };

  return { count, loading, error, increment };
}
```

### Props の extends

```typescript
// HTML要素のPropsを継承
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  isLoading?: boolean;
}

function Button({ variant, isLoading, children, ...props }: ButtonProps) {
  return (
    <button 
      className={`btn-${variant}`} 
      disabled={isLoading}
      {...props}  // onClick, type などを透過
    >
      {isLoading ? '読み込み中...' : children}
    </button>
  );
}

// 使用時：HTML標準の属性も使える
<Button variant="primary" type="submit" onClick={handleClick}>
  送信
</Button>
```

### 型ガード

```typescript
interface SuccessResponse {
  success: true;
  data: string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  // 型ガード: success の値で型を絞り込む
  if (response.success) {
    // ここではSuccessResponse型
    console.log(response.data);
  } else {
    // ここではErrorResponse型
    console.log(response.error);
  }
}
```

---

## 型定義ファイル

### このプロジェクトの例

`src/types/index.ts`：

```typescript
// BBS関連の型定義
export interface Post {
  id: string;
  name: string;
  content: string;
  created_at: string;
  delete_key_hash?: string;
}

export interface PostFormData {
  name: string;
  content: string;
  deleteKey: string;
}

export interface ApiResult {
  success: boolean;
  error?: string;
}

// コンポーネントProps型定義
export interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

export interface BlinkTextProps {
  children: React.ReactNode;
  color?: string;
  speed?: 'fast' | 'normal' | 'slow';
}
```

使う側：

```typescript
import type { Post, PostFormData } from '../types';

// type を使うと「型だけインポート」を明示
// ビルド時に消えるので最適化される
```

### 型定義のベストプラクティス

```typescript
// 1. 関連する型は同じファイルにまとめる
// types/bbs.ts - BBS関連
// types/user.ts - ユーザー関連

// 2. export type でインポート側も明示
export type { Post, PostFormData };

// 3. Propsの型名は〇〇Propsに統一
interface ButtonProps { ... }
interface CardProps { ... }

// 4. APIレスポンスは別途まとめる
interface ApiError {
  code: string;
  message: string;
}
```

---

## 🎯 練習問題

### 問題1: 型定義

以下のデータ構造に対する型を定義してください：

```javascript
const user = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
  profile: {
    bio: '自己紹介文',
    website: 'https://example.com',  // 省略可能
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/taro' },
      { platform: 'github', url: 'https://github.com/taro' }
    ]
  }
};
```

### 問題2: コンポーネントの型定義

以下の要件を満たす `Alert` コンポーネントの型を定義してください：

- `type`: 'success' | 'warning' | 'error' のいずれか
- `title`: 文字列（必須）
- `message`: 文字列（省略可能）
- `onClose`: クリック時のコールバック関数（省略可能）

### 問題3: カスタムフックの型

localStorageを使うカスタムフック `useLocalStorage` の型を定義してください：

```typescript
// 使用例
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
```

---

**次へ: [04-project-walkthrough.md](./04-project-walkthrough.md)**

