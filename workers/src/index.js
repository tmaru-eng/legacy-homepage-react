/**
 * レガシーホームページ API
 * Cloudflare Workers + D1
 */

import { getPosts, createPost, deletePost } from './routes/posts.js';
import { getCounter, incrementCounter } from './routes/counter.js';

// CORSヘッダー
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// CORSプリフライトリクエストのハンドラ
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}

// レスポンスにCORSヘッダーを追加
function addCorsHeaders(response) {
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

// URLからパスパラメータを抽出
function extractPostId(pathname) {
  const match = pathname.match(/^\/api\/posts\/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // プリフライトリクエスト
    if (method === 'OPTIONS') {
      return handleOptions();
    }

    // ヘルスチェック
    if (pathname === '/api/health' && method === 'GET') {
      return addCorsHeaders(new Response(JSON.stringify({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // BBS API
    if (pathname === '/api/posts') {
      if (method === 'GET') {
        const response = await getPosts(env.DB);
        return addCorsHeaders(response);
      }
      if (method === 'POST') {
        const response = await createPost(env.DB, request);
        return addCorsHeaders(response);
      }
    }

    // 投稿削除 API
    const postId = extractPostId(pathname);
    if (postId && method === 'DELETE') {
      const response = await deletePost(env.DB, request, postId);
      return addCorsHeaders(response);
    }

    // カウンター API
    if (pathname === '/api/counter') {
      if (method === 'GET') {
        const response = await getCounter(env.DB);
        return addCorsHeaders(response);
      }
      if (method === 'POST') {
        const response = await incrementCounter(env.DB);
        return addCorsHeaders(response);
      }
    }

    // 404 Not Found
    return addCorsHeaders(new Response(JSON.stringify({
      success: false,
      error: 'Not Found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

