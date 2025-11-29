import { useState, useEffect, useCallback } from 'react';
import { isApiEnabled, bbsApi } from './useApi';

const STORAGE_KEY = 'bbs_posts';

interface Post {
  id: string;
  name: string;
  content: string;
  deleteKey: string;
  createdAt: string;
}

interface PostFormData {
  name: string;
  content: string;
  deleteKey: string;
}

interface ApiResult {
  success: boolean;
  error?: string;
}

interface ApiPostsResponse {
  posts: Post[];
}

interface ApiPostResponse {
  post: Post;
}

interface UseBBSReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (formData: PostFormData) => Promise<ApiResult>;
  deletePost: (postId: string, deleteKey: string) => Promise<ApiResult>;
  refresh: () => Promise<void>;
  isApiMode: boolean;
}

/**
 * BBS用カスタムフック
 * API有効時はAPI経由、無効時はlocalStorageを使用
 */
export const useBBS = (): UseBBSReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const useApi = isApiEnabled();

  // HTMLエスケープ関数（localStorage用）
  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // 投稿を読み込み
  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (useApi) {
        // API経由
        const response = await bbsApi.getPosts<ApiPostsResponse>();
        setPosts(response.posts || []);
      } else {
        // localStorage
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        } else {
          setPosts([]);
        }
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // APIエラー時はlocalStorageにフォールバック
      if (useApi) {
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      }
    } finally {
      setLoading(false);
    }
  }, [useApi]);

  // 初期読み込み
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // 投稿を追加
  const addPost = useCallback(async (formData: PostFormData): Promise<ApiResult> => {
    try {
      if (useApi) {
        // API経由
        const response = await bbsApi.createPost<ApiPostResponse>(formData);
        setPosts(prev => [response.post, ...prev]);
        return { success: true };
      } else {
        // localStorage
        const newPost: Post = {
          id: Date.now().toString(),
          name: escapeHtml(formData.name.trim()),
          content: escapeHtml(formData.content.trim()),
          deleteKey: formData.deleteKey.trim(),
          createdAt: new Date().toISOString()
        };
        
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        return { success: true };
      }
    } catch (err) {
      console.error('Failed to add post:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  }, [useApi, posts]);

  // 投稿を削除
  const deletePost = useCallback(async (postId: string, deleteKey: string): Promise<ApiResult> => {
    try {
      if (useApi) {
        // API経由
        await bbsApi.deletePost(postId, deleteKey);
        setPosts(prev => prev.filter(p => p.id !== postId));
        return { success: true };
      } else {
        // localStorage
        const post = posts.find(p => p.id === postId);
        
        if (!post) {
          return { success: false, error: '投稿が見つかりません' };
        }
        
        if (post.deleteKey !== deleteKey) {
          return { success: false, error: '削除キーが間違っています' };
        }
        
        const updatedPosts = posts.filter(p => p.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        return { success: true };
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  }, [useApi, posts]);

  return {
    posts,
    loading,
    error,
    addPost,
    deletePost,
    refresh: loadPosts,
    isApiMode: useApi
  };
};

export default useBBS;
