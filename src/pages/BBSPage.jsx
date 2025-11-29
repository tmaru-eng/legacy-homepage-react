import { useState } from 'react';
import { PostForm, PostList } from '../components/BBS';
import { RainbowText, BlinkText } from '../components/Effects';
import { useBBS } from '../hooks';

const BBSPage = () => {
  const { posts, loading, addPost, deletePost } = useBBS();
  const [message, setMessage] = useState({ type: '', text: '' });

  // 投稿処理
  const handleSubmit = async (formData) => {
    const result = await addPost(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: '投稿しました！' });
    } else {
      setMessage({ type: 'error', text: result.error || '投稿に失敗しました' });
    }
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // 削除処理
  const handleDelete = async (postId, deleteKey) => {
    const result = await deletePost(postId, deleteKey);
    
    if (result.success) {
      setMessage({ type: 'success', text: '投稿を削除しました' });
    } else {
      setMessage({ type: 'error', text: result.error || '削除に失敗しました' });
    }
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="bbs-page">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        <RainbowText>★ 掲示板(BBS) ★</RainbowText>
      </h1>

      {/* 説明 */}
      <div className="section-box" style={{ marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px' }}>
            <BlinkText color="#ffff00">★</BlinkText>
            　ご意見・ご感想・キリ番報告など、お気軽にどうぞ！　
            <BlinkText color="#ffff00">★</BlinkText>
          </p>
          <p style={{ fontSize: '12px', color: '#cccccc' }}>
            荒らし・誹謗中傷・宣伝目的の書き込みはご遠慮ください。
          </p>
        </div>
      </div>

      {/* メッセージ表示 */}
      {message.text && (
        <div style={{
          padding: '10px 15px',
          marginBottom: '15px',
          background: message.type === 'success' ? '#003300' : '#330000',
          border: `2px solid ${message.type === 'success' ? '#00ff00' : '#ff0000'}`,
          color: message.type === 'success' ? '#00ff00' : '#ff0000',
          textAlign: 'center'
        }}>
          {message.text}
        </div>
      )}

      {/* 投稿フォーム */}
      <PostForm onSubmit={handleSubmit} />

      <hr className="legacy-hr" />

      {/* 投稿一覧 */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#999999' }}>
          読み込み中...
        </div>
      ) : (
        <PostList posts={posts} onDelete={handleDelete} />
      )}

      {/* 注意事項 */}
      <div className="section-box" style={{ marginTop: '20px' }}>
        <div className="section-title">★ ご利用にあたって ★</div>
        <ul style={{ 
          fontSize: '11px', 
          color: '#cccccc', 
          lineHeight: '1.8',
          listStyle: 'none',
          padding: '10px'
        }}>
          <li>・投稿内容は管理人の判断で削除する場合があります</li>
          <li>・削除キーは投稿時に設定したものを使用してください</li>
          <li>・個人情報の書き込みは自己責任でお願いします</li>
          <li>・不具合がありましたら管理人までご連絡ください</li>
        </ul>
      </div>

      {/* CGI風クレジット */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px',
        fontSize: '10px',
        color: '#666699'
      }}>
        <p>- BBS Script Ver.1.0 -</p>
        <p>Powered by React</p>
      </div>
    </div>
  );
};

export default BBSPage;
