/**
 * API通信用カスタムフック
 * 環境変数でAPI URLを切り替え可能
 */

// API URLの取得（環境変数またはlocalStorage）
const getApiUrl = () => {
  // 本番環境のAPI URL（環境変数から取得）
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // ローカル開発時はlocalStorageモードを使用
  return null;
};

// APIが有効かどうかを判定
export const isApiEnabled = () => {
  return !!getApiUrl();
};

/**
 * API呼び出し関数
 * @param {string} endpoint - APIエンドポイント（例: '/posts'）
 * @param {object} options - fetchオプション
 * @returns {Promise<object>} レスポンスデータ
 */
export const apiCall = async (endpoint, options = {}) => {
  const apiUrl = getApiUrl();
  
  if (!apiUrl) {
    throw new Error('API is not configured');
  }
  
  const url = `${apiUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data;
};

/**
 * BBS API
 */
export const bbsApi = {
  // 投稿一覧取得
  getPosts: () => apiCall('/api/posts'),
  
  // 新規投稿
  createPost: (data) => apiCall('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // 投稿削除
  deletePost: (id, deleteKey) => apiCall(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ deleteKey }),
  }),
};

/**
 * カウンター API
 */
export const counterApi = {
  // カウンター取得
  getCount: () => apiCall('/api/counter'),
  
  // カウンターインクリメント
  increment: () => apiCall('/api/counter', {
    method: 'POST',
  }),
};

