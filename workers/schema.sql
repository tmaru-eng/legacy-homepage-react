-- ============================================
-- レガシーホームページ D1 データベーススキーマ
-- ============================================

-- 既存テーブルを削除（初期化用）
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS counter;

-- BBS投稿テーブル
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    delete_key_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 投稿テーブルにインデックスを追加
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- アクセスカウンターテーブル
CREATE TABLE counter (
    id INTEGER PRIMARY KEY CHECK (id = 1),  -- 常に1レコードのみ
    count INTEGER NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- カウンター初期値を挿入
INSERT INTO counter (id, count) VALUES (1, 0);

