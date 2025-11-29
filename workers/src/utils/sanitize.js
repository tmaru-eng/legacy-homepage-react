/**
 * HTMLエスケープ（XSS対策）
 * @param {string} text - エスケープする文字列
 * @returns {string} エスケープ済み文字列
 */
export function escapeHtml(text) {
  if (!text) return '';
  
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, char => escapeMap[char]);
}

/**
 * 入力値のバリデーション
 * @param {string} value - 検証する値
 * @param {number} maxLength - 最大文字数
 * @param {string} fieldName - フィールド名（エラーメッセージ用）
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateInput(value, maxLength, fieldName) {
  if (!value || typeof value !== 'string') {
    return { valid: false, error: `${fieldName}を入力してください` };
  }
  
  const trimmed = value.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: `${fieldName}を入力してください` };
  }
  
  if (trimmed.length > maxLength) {
    return { valid: false, error: `${fieldName}は${maxLength}文字以内で入力してください` };
  }
  
  return { valid: true };
}

/**
 * 投稿データのバリデーション
 * @param {object} data - 投稿データ
 * @returns {{ valid: boolean, errors?: string[] }}
 */
export function validatePostData(data) {
  const errors = [];
  
  const nameValidation = validateInput(data.name, 20, 'お名前');
  if (!nameValidation.valid) {
    errors.push(nameValidation.error);
  }
  
  const contentValidation = validateInput(data.content, 1000, 'メッセージ');
  if (!contentValidation.valid) {
    errors.push(contentValidation.error);
  }
  
  const deleteKeyValidation = validateInput(data.deleteKey, 20, '削除キー');
  if (!deleteKeyValidation.valid) {
    errors.push(deleteKeyValidation.error);
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

