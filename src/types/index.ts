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

// カウンター関連の型定義
export interface CounterData {
  count: number;
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

export interface RainbowTextProps {
  children: string;
  animated?: boolean;
}

export interface BannerProps {
  width?: number;
  height?: number;
  text?: string;
  bgGradient?: string;
  href?: string;
}

export interface UnderConstructionProps {
  message?: string;
}

export interface AccessCounterProps {
  initialCount?: number;
}

export interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>;
}

export interface PostListProps {
  posts: Post[];
  onDelete: (postId: string, deleteKey: string) => Promise<void>;
}

// Layout関連
export interface LayoutProps {
  children: React.ReactNode;
}
