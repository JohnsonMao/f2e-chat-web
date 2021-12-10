/* 動態計算跳轉路由 */

export default function getRedirectTo (name) {
  let path = 'partner';
  if (!name) {
    path = 'userinfo';
  }
  return path
}