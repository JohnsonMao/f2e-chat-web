/* 動態計算跳轉路由 */

export default function getRedirectTo (type, name) {
  let path = '';
  if (type === 'boss') {
    path = '/boss';
  } else {
    path = '/freelance';
  }
  if (!name) {
    path += 'info';
  }
  return path
}