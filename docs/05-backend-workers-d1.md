# 📦 バックエンド編: Cloudflare Workers + D1

**サーバーレスAPIとデータベースを学ぶ**

---

## 目次

1. [Cloudflare Workers とは](#cloudflare-workers-とは)
2. [D1 データベースとは](#d1-データベースとは)
3. [このプロジェクトのAPI構成](#このプロジェクトのapi構成)
4. [APIの実装解説](#apiの実装解説)
5. [フロントエンドとの連携](#フロントエンドとの連携)

---

## Cloudflare Workers とは

### 従来のサーバー vs サーバーレス

| 従来（LAMP等） | Cloudflare Workers |
|---------------|-------------------|
| サーバーを用意・管理 | サーバー管理不要 |
| 24時間稼働でコスト発生 | リクエスト時のみ課金 |
| 特定リージョンで動作 | 世界中のエッジで動作 |
| スケーリングは手動 | 自動スケール |

### Workers の特徴

```
┌─────────────────────────────────────────────┐
│  ユーザー（世界中）                           │
│     ↓                                       │
│  Cloudflare Edge（最寄りのサーバー）          │
│     ↓                                       │
│  Workers（JavaScriptが実行される）           │
│     ↓                                       │
│  D1 / KV / R2 など（データストア）            │
└─────────────────────────────────────────────┘
```

- **JavaScript/TypeScript** で書ける
- **コールドスタートが速い**（V8 isolate使用）
- **無料枠が充実**（10万リクエスト/日）

---

## D1 データベースとは

### D1 = サーバーレス SQLite

```sql
-- 従来のMySQL/PostgreSQLと同じSQLが使える
SELECT * FROM posts WHERE id = 1;
INSERT INTO posts (name, content) VALUES ('太郎', 'こんにちは');
```

### このプロジェクトのテーブル設計

`workers/schema.sql`:

```sql
-- 投稿テーブル
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  delete_key_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- カウンターテーブル
CREATE TABLE IF NOT EXISTS counter (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  count INTEGER DEFAULT 0
);

-- 初期データ
INSERT OR IGNORE INTO counter (id, count) VALUES (1, 0);
```

**ポイント:**
- `AUTOINCREMENT`: 自動採番
- `NOT NULL`: 必須フィールド
- `DEFAULT CURRENT_TIMESTAMP`: 自動で現在時刻
- `CHECK (id = 1)`: カウンターは1行のみに制限

---

## このプロジェクトのAPI構成

### ディレクトリ構造

```
workers/
├── src/
│   ├── index.js          # メインルーター
│   ├── routes/
│   │   ├── posts.js      # BBS API（CRUD）
│   │   └── counter.js    # カウンターAPI
│   └── utils/
│       ├── sanitize.js   # XSS対策
│       └── hash.js       # パスワードハッシュ
├── schema.sql            # テーブル定義
└── wrangler.toml         # 設定ファイル
```

### APIエンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/posts` | 投稿一覧取得 |
| POST | `/api/posts` | 新規投稿 |
| DELETE | `/api/posts/:id` | 投稿削除 |
| GET | `/api/counter` | カウンター取得 |
| POST | `/api/counter` | カウンター+1 |

---

## APIの実装解説

### 従来の方法（PHP）との比較

**PHP (LAMP):**
```php
<?php
// bbs.php - 全ての処理が1ファイル
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=mydb', 'user', 'pass');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM posts ORDER BY created_at DESC');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $content = htmlspecialchars($_POST['content']);
    $stmt = $pdo->prepare('INSERT INTO posts (name, content) VALUES (?, ?)');
    $stmt->execute([$name, $content]);
    echo json_encode(['success' => true]);
}
?>
```

**Cloudflare Workers:**
```javascript
// より構造化された実装
export default {
  async fetch(request, env) {
    if (request.method === 'GET') {
      const { results } = await env.DB.prepare('SELECT * FROM posts').all();
      return Response.json(results);
    }
    if (request.method === 'POST') {
      const { name, content } = await request.json();
      await env.DB.prepare('INSERT INTO posts (name, content) VALUES (?, ?)')
        .bind(name, content).run();
      return Response.json({ success: true });
    }
  }
};
```

| 比較項目 | PHP (LAMP) | Cloudflare Workers |
|---------|------------|-------------------|
| 言語 | PHP | JavaScript |
| DB接続 | PDO / mysqli | env.DB (D1バインディング) |
| デプロイ | FTP / SSH | `wrangler deploy` |
| スケール | 手動 | 自動 |
| 料金 | 月額固定 | 使った分だけ |

### 1. メインルーター

`workers/src/index.js`:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS設定（フロントエンドからのアクセスを許可）
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // ルーティング
    if (path.startsWith('/api/posts')) {
      return handlePosts(request, env, path);
    }
    if (path.startsWith('/api/counter')) {
      return handleCounter(request, env);
    }

    return new Response('Not Found', { status: 404 });
  },
};
```

**ポイント:**
- `request`: リクエスト情報（メソッド、ボディ等）
- `env`: 環境変数やD1バインディング
- `CORS`: 別ドメインからのAPIアクセスを許可

### 2. 投稿一覧取得（GET）

```javascript
// GET /api/posts
async function getPosts(env) {
  const { results } = await env.DB.prepare(
    'SELECT * FROM posts ORDER BY created_at DESC'
  ).all();
  
  return new Response(JSON.stringify({ posts: results }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**D1の使い方:**
- `env.DB`: wrangler.tomlで設定したD1バインディング
- `.prepare()`: SQLを準備
- `.all()`: 全件取得
- `.first()`: 1件取得
- `.run()`: INSERT/UPDATE/DELETE

### 3. 新規投稿（POST）

```javascript
// POST /api/posts
async function createPost(request, env) {
  const body = await request.json();
  const { name, content, deleteKey } = body;

  // バリデーション
  if (!name || !content) {
    return new Response(
      JSON.stringify({ error: '名前と内容は必須です' }),
      { status: 400 }
    );
  }

  // XSS対策（HTMLエスケープ）
  const safeName = escapeHtml(name);
  const safeContent = escapeHtml(content);
  
  // 削除キーをハッシュ化
  const keyHash = deleteKey ? await hashPassword(deleteKey) : null;

  // データベースに挿入
  const result = await env.DB.prepare(
    'INSERT INTO posts (name, content, delete_key_hash) VALUES (?, ?, ?)'
  ).bind(safeName, safeContent, keyHash).run();

  return new Response(
    JSON.stringify({ success: true, id: result.lastRowId }),
    { status: 201 }
  );
}
```

**セキュリティ対策:**
- **XSS対策**: ユーザー入力をエスケープ
- **パスワードハッシュ**: 削除キーは平文で保存しない

### 4. 投稿削除（DELETE）

```javascript
// DELETE /api/posts/:id
async function deletePost(request, env, postId) {
  const body = await request.json();
  const { deleteKey } = body;

  // 投稿を取得
  const post = await env.DB.prepare(
    'SELECT * FROM posts WHERE id = ?'
  ).bind(postId).first();

  if (!post) {
    return new Response(
      JSON.stringify({ error: '投稿が見つかりません' }),
      { status: 404 }
    );
  }

  // 削除キーを検証
  if (post.delete_key_hash) {
    const isValid = await verifyPassword(deleteKey, post.delete_key_hash);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: '削除キーが間違っています' }),
        { status: 403 }
      );
    }
  }

  // 削除実行
  await env.DB.prepare('DELETE FROM posts WHERE id = ?')
    .bind(postId)
    .run();

  return new Response(JSON.stringify({ success: true }));
}
```

### 5. カウンター（アトミック更新）

```javascript
// POST /api/counter（インクリメント）
async function incrementCounter(env) {
  // UPDATE と SELECT を1つのクエリで実行（競合防止）
  await env.DB.prepare(
    'UPDATE counter SET count = count + 1 WHERE id = 1'
  ).run();
  
  const { count } = await env.DB.prepare(
    'SELECT count FROM counter WHERE id = 1'
  ).first();

  return new Response(JSON.stringify({ count }));
}
```

**ポイント:**
- `count + 1`: SQLで直接インクリメント（アトミック）
- 複数リクエストが同時に来ても正しくカウント

---

## フロントエンドとの連携

### 環境変数でAPI URLを切り替え

`src/hooks/useApi.ts`:

```typescript
// 環境変数からAPI URLを取得
const API_URL = import.meta.env.VITE_API_URL;

// APIが有効かどうか
export const isApiEnabled = (): boolean => {
  return !!API_URL;  // URLが設定されていればtrue
};
```

**動作モード:**
- **ローカル開発**: `VITE_API_URL` 未設定 → localStorage使用
- **本番環境**: `VITE_API_URL` 設定済み → API使用

### API呼び出しの実装

```typescript
// 汎用API呼び出し関数
export const apiCall = async <T>(
  endpoint: string, 
  options: FetchOptions = {}
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};
```

### カスタムフックでの使い分け

`src/hooks/useBBS.ts`:

```typescript
const addPost = async (formData) => {
  if (isApiEnabled()) {
    // 本番：API経由
    await apiCall('/api/posts', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  } else {
    // ローカル：localStorage
    const newPost = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    const posts = JSON.parse(localStorage.getItem('bbs_posts') || '[]');
    localStorage.setItem('bbs_posts', JSON.stringify([newPost, ...posts]));
  }
};
```

**メリット:**
- ローカル開発ではバックエンド不要
- 本番では自動的にAPI使用
- コードの変更なしで切り替え可能

---

## wrangler.toml の設定

```toml
name = "legacy-homepage-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"                    # コードで使う名前
database_name = "legacy-homepage-db"
database_id = "your-database-id"  # wrangler d1 create で取得
```

**設定項目:**
- `name`: Workers名（URLになる）
- `main`: エントリーポイント
- `binding`: コード内で `env.DB` としてアクセス
- `database_id`: D1データベースのID

---

## よくあるパターン

### 1. エラーハンドリング

```javascript
try {
  const result = await env.DB.prepare('SELECT * FROM posts').all();
  return new Response(JSON.stringify(result));
} catch (error) {
  console.error('DB Error:', error);
  return new Response(
    JSON.stringify({ error: 'データベースエラー' }),
    { status: 500 }
  );
}
```

### 2. 入力バリデーション

```javascript
// 文字数制限
if (name.length > 20) {
  return new Response(
    JSON.stringify({ error: '名前は20文字以内' }),
    { status: 400 }
  );
}

// 必須チェック
if (!content?.trim()) {
  return new Response(
    JSON.stringify({ error: '内容は必須です' }),
    { status: 400 }
  );
}
```

### 3. XSS対策

```javascript
// HTMLエスケープ
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

---

## 🎯 練習問題

### 問題1: 新しいエンドポイントを追加

「いいね」機能を追加してみましょう：
- `POST /api/posts/:id/like` でいいね数を+1
- postsテーブルに `likes` カラムを追加

### 問題2: ページネーション

投稿一覧にページネーションを実装：
- `GET /api/posts?page=1&limit=10`
- SQLの `LIMIT` と `OFFSET` を使用

### 問題3: 検索機能

投稿の検索APIを実装：
- `GET /api/posts/search?q=キーワード`
- SQLの `LIKE` を使用

---

## 📚 参考リソース

- [Cloudflare Workers 公式ドキュメント](https://developers.cloudflare.com/workers/)
- [D1 公式ドキュメント](https://developers.cloudflare.com/d1/)
- [Wrangler CLI リファレンス](https://developers.cloudflare.com/workers/wrangler/)

---

**次へ: [06-exercises-solutions.md](./06-exercises-solutions.md)**

