/**
 * カウンター値を取得
 * GET /api/counter
 */
export async function getCounter(db) {
  try {
    const { results } = await db
      .prepare('SELECT count FROM counter WHERE id = 1')
      .all();
    
    const count = results?.[0]?.count || 0;
    
    return new Response(JSON.stringify({
      success: true,
      count
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching counter:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'カウンターの取得に失敗しました'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * カウンターをインクリメント
 * POST /api/counter
 */
export async function incrementCounter(db) {
  try {
    // カウンターをインクリメントして更新
    await db
      .prepare(`
        UPDATE counter 
        SET count = count + 1, updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `)
      .run();
    
    // 更新後の値を取得
    const { results } = await db
      .prepare('SELECT count FROM counter WHERE id = 1')
      .all();
    
    const count = results?.[0]?.count || 0;
    
    return new Response(JSON.stringify({
      success: true,
      count
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'カウンターの更新に失敗しました'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

