import { useState } from 'react';
import './BBS.css';

interface Post {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
  onDelete: (postId: string, deleteKey: string) => void;
}

interface DeleteModal {
  isOpen: boolean;
  postId: string | null;
  deleteKey: string;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
    postId: null,
    deleteKey: ''
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const handleDeleteClick = (postId: string) => {
    setDeleteModal({
      isOpen: true,
      postId,
      deleteKey: ''
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.deleteKey.trim() && deleteModal.postId) {
      onDelete(deleteModal.postId, deleteModal.deleteKey.trim());
      setDeleteModal({
        isOpen: false,
        postId: null,
        deleteKey: ''
      });
    }
  };

  const handleCloseModal = () => {
    setDeleteModal({
      isOpen: false,
      postId: null,
      deleteKey: ''
    });
  };

  // HTMLエスケープ済みのコンテンツを改行対応で表示
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  if (posts.length === 0) {
    return (
      <div className="bbs-empty">
        <p>まだ投稿がありません</p>
        <p style={{ fontSize: '12px', color: '#999999', marginTop: '10px' }}>
          最初の書き込みをどうぞ！
        </p>
      </div>
    );
  }

  return (
    <div className="bbs-post-list">
      <div className="section-title">📋 投稿一覧 ({posts.length}件)</div>
      
      {posts.map((post, index) => (
        <div key={post.id} className="bbs-post">
          <div className="post-header">
            <span className="post-number">No.{posts.length - index}</span>
            <span className="post-name">{post.name}</span>
            <span className="post-date">{formatDate(post.createdAt)}</span>
            <button 
              className="post-delete-btn"
              onClick={() => handleDeleteClick(post.id)}
              title="削除"
            >
              ×
            </button>
          </div>
          <div className="post-content">
            {renderContent(post.content)}
          </div>
        </div>
      ))}

      {/* 削除確認モーダル */}
      {deleteModal.isOpen && (
        <div className="delete-modal-overlay" onClick={handleCloseModal}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <div className="delete-modal-title">投稿を削除</div>
            <p>削除キーを入力してください</p>
            <input
              type="password"
              value={deleteModal.deleteKey}
              onChange={(e) => setDeleteModal(prev => ({
                ...prev,
                deleteKey: e.target.value
              }))}
              className="legacy-input"
              placeholder="削除キー"
              autoFocus
            />
            <div className="delete-modal-actions">
              <button 
                className="legacy-button"
                onClick={handleDeleteConfirm}
              >
                削除する
              </button>
              <button 
                className="legacy-button"
                onClick={handleCloseModal}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
