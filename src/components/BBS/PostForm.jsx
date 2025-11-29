import { useState } from 'react';
import './BBS.css';

const PostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    deleteKey: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    } else if (formData.name.length > 20) {
      newErrors.name = 'お名前は20文字以内で入力してください';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'メッセージを入力してください';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'メッセージは1000文字以内で入力してください';
    }
    
    if (!formData.deleteKey.trim()) {
      newErrors.deleteKey = '削除キーを入力してください';
    } else if (formData.deleteKey.length > 20) {
      newErrors.deleteKey = '削除キーは20文字以内で入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      content: formData.content.trim(),
      deleteKey: formData.deleteKey.trim()
    });

    // フォームをリセット
    setFormData({
      name: '',
      content: '',
      deleteKey: ''
    });
  };

  return (
    <div className="bbs-form-container">
      <div className="section-title">✏️ 新規投稿</div>
      
      <form onSubmit={handleSubmit} className="bbs-form">
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            お名前<span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="legacy-input"
            maxLength={20}
            placeholder="なまえ"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <label htmlFor="content" className="form-label">
            メッセージ<span className="required">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="legacy-textarea"
            rows={5}
            maxLength={1000}
            placeholder="メッセージを入力してください"
          />
          <span className="char-count">
            {formData.content.length}/1000
          </span>
          {errors.content && <span className="form-error">{errors.content}</span>}
        </div>

        <div className="form-row">
          <label htmlFor="deleteKey" className="form-label">
            削除キー<span className="required">*</span>
          </label>
          <input
            type="password"
            id="deleteKey"
            name="deleteKey"
            value={formData.deleteKey}
            onChange={handleChange}
            className="legacy-input"
            maxLength={20}
            placeholder="削除用パスワード"
            style={{ width: '150px' }}
          />
          {errors.deleteKey && <span className="form-error">{errors.deleteKey}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="legacy-button">
            📝 書き込む
          </button>
          <button 
            type="button" 
            className="legacy-button"
            onClick={() => setFormData({ name: '', content: '', deleteKey: '' })}
          >
            🗑️ クリア
          </button>
        </div>
      </form>

      <div className="form-notice">
        <p>※ 荒らし・誹謗中傷はご遠慮ください</p>
        <p>※ 削除キーは投稿を削除する際に必要です</p>
      </div>
    </div>
  );
};

export default PostForm;

