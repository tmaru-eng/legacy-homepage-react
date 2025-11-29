/**
 * API通信用カスタムフック
 * 環境変数でAPI URLを切り替え可能
 */

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

// API URLの取得（環境変数またはlocalStorage）
const getApiUrl = (): string | null => {
  // 本番環境のAPI URL（環境変数から取得）
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // ローカル開発時はlocalStorageモードを使用
  return null;
};

// APIが有効かどうかを判定
export const isApiEnabled = (): boolean => {
  return !!getApiUrl();
};

/**
 * API呼び出し関数
 * @param endpoint - APIエンドポイント（例: '/posts'）
 * @param options - fetchオプション
 * @returns レスポンスデータ
 */
export const apiCall = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
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

interface PostFormData {
  name: string;
  content: string;
  deleteKey: string;
}

/**
 * BBS API
 */
export const bbsApi = {
  // 投稿一覧取得
  getPosts: <T>() => apiCall<T>('/api/posts'),
  
  // 新規投稿
  createPost: <T>(data: PostFormData) => apiCall<T>('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // 投稿削除
  deletePost: <T>(id: string, deleteKey: string) => apiCall<T>(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ deleteKey }),
  }),
};

/**
 * カウンター API
 */
export const counterApi = {
  // カウンター取得
  getCount: <T>() => apiCall<T>('/api/counter'),
  
  // カウンターインクリメント
  increment: <T>() => apiCall<T>('/api/counter', {
    method: 'POST',
  }),
};
