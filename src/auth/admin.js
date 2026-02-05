const ADMIN_USER = process.env.REACT_APP_ADMIN_USER || 'dinar';
const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS || '123';

const SESSION_KEY = 'dz_admin_session_v1';

export function isAdminSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function loginAdmin({ user, pass }) {
  const ok = String(user || '') === ADMIN_USER && String(pass || '') === ADMIN_PASS;
  if (!ok) return { ok: false };

  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // ignore
  }
  return { ok: true };
}

