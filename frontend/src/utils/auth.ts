export interface JwtPayload {
  sub: string;
  role_id: number;
  user_id?: number;
  exp: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function getUserRole(): number {
  const token = localStorage.getItem('token');
  if (!token) return 0;
  const decoded = decodeToken(token);
  return decoded?.role_id || 0;
}

export function getUserId(): number {
  const token = localStorage.getItem('token');
  if (!token) return 0;
  const decoded = decodeToken(token);
  return decoded?.user_id || 0;
}
