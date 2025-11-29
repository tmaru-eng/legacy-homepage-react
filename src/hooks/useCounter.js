import { useState, useEffect, useCallback } from 'react';
import { isApiEnabled, counterApi } from './useApi';

const STORAGE_KEY = 'access_count';

/**
 * アクセスカウンター用カスタムフック
 * API有効時はAPI経由、無効時はlocalStorageを使用
 * レガシーHP再現：リロードするたびにカウントアップ
 */
export const useCounter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const useApi = isApiEnabled();

  // カウンターを読み込み（毎回インクリメント）
  const loadCounter = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (useApi) {
        // API経由：毎回インクリメント
        const response = await counterApi.increment();
        setCount(response.count);
      } else {
        // localStorage：毎回インクリメント
        let currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        currentCount += 1;
        localStorage.setItem(STORAGE_KEY, currentCount.toString());
        setCount(currentCount);
      }
    } catch (err) {
      console.error('Failed to load counter:', err);
      setError(err.message);
      
      // APIエラー時はlocalStorageにフォールバック
      const storedCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      setCount(storedCount);
    } finally {
      setLoading(false);
    }
  }, [useApi]);

  // 初期読み込み
  useEffect(() => {
    loadCounter();
  }, [loadCounter]);

  // キリ番判定
  const isKiriban = count > 0 && (
    count % 1000 === 0 || 
    count % 100 === 0 || 
    /^(\d)\1+$/.test(count.toString()) // ゾロ目
  );

  return {
    count,
    loading,
    error,
    isKiriban,
    isApiMode: useApi
  };
};

export default useCounter;

