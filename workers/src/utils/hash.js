/**
 * SHA-256ハッシュを生成
 * @param {string} text - ハッシュ化する文字列
 * @returns {Promise<string>} ハッシュ文字列（16進数）
 */
export async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * 削除キーをハッシュ化
 * @param {string} deleteKey - 削除キー
 * @returns {Promise<string>} ハッシュ化された削除キー
 */
export async function hashDeleteKey(deleteKey) {
  // ソルト付きでハッシュ化（セキュリティ向上）
  const salt = 'legacy-homepage-salt-2024';
  return sha256(`${salt}:${deleteKey}`);
}

/**
 * 削除キーの検証
 * @param {string} inputKey - 入力された削除キー
 * @param {string} storedHash - データベースに保存されたハッシュ
 * @returns {Promise<boolean>} 一致する場合true
 */
export async function verifyDeleteKey(inputKey, storedHash) {
  const inputHash = await hashDeleteKey(inputKey);
  return inputHash === storedHash;
}

