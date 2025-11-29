import { escapeHtml, validatePostData } from '../utils/sanitize.js';
import { hashDeleteKey, verifyDeleteKey } from '../utils/hash.js';

/**
 * BBS投稿一覧を取得
 * GET /api/posts
 */
export async function getPosts(db) {
  try {
    const { results } = await db
      .prepare(`
        SELECT id, name, content, created_at as createdAt
        FROM posts
        ORDER BY created_at DESC
        LIMIT 100
      `)
      .all();
    
    return new Response(JSON.stringify({
      success: true,
      posts: results || []
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '投稿の取得に失敗しました'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * 新規投稿を作成
 * POST /api/posts
 */
export async function createPost(db, request) {
  try {
    const data = await request.json();
    
    // バリデーション
    const validation = validatePostData(data);
    if (!validation.valid) {
      return new Response(JSON.stringify({
        success: false,
        errors: validation.errors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // HTMLエスケープ
    const name = escapeHtml(data.name.trim());
    const content = escapeHtml(data.content.trim());
    
    // 削除キーをハッシュ化
    const deleteKeyHash = await hashDeleteKey(data.deleteKey.trim());
    
    // データベースに挿入
    const result = await db
      .prepare(`
        INSERT INTO posts (name, content, delete_key_hash)
        VALUES (?, ?, ?)
      `)
      .bind(name, content, deleteKeyHash)
      .run();
    
    // 挿入した投稿を取得
    const { results } = await db
      .prepare(`
        SELECT id, name, content, created_at as createdAt
        FROM posts
        WHERE id = ?
      `)
      .bind(result.meta.last_row_id)
      .all();
    
    return new Response(JSON.stringify({
      success: true,
      post: results[0]
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '投稿の作成に失敗しました'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * 投稿を削除
 * DELETE /api/posts/:id
 */
export async function deletePost(db, request, postId) {
  try {
    const data = await request.json();
    const deleteKey = data.deleteKey?.trim();
    
    if (!deleteKey) {
      return new Response(JSON.stringify({
        success: false,
        error: '削除キーを入力してください'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 投稿を取得
    const { results } = await db
      .prepare(`
        SELECT id, delete_key_hash
        FROM posts
        WHERE id = ?
      `)
      .bind(postId)
      .all();
    
    if (!results || results.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: '投稿が見つかりません'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const post = results[0];
    
    // 削除キーを検証
    const isValid = await verifyDeleteKey(deleteKey, post.delete_key_hash);
    if (!isValid) {
      return new Response(JSON.stringify({
        success: false,
        error: '削除キーが間違っています'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 削除実行
    await db
      .prepare('DELETE FROM posts WHERE id = ?')
      .bind(postId)
      .run();
    
    return new Response(JSON.stringify({
      success: true,
      message: '投稿を削除しました'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '投稿の削除に失敗しました'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

