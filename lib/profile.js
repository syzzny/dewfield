// 피부 진단 결과를 브라우저에 저장해 마이페이지에서 다시 보여줘요.
const KEY = 'dewfield-skin-profile';

export const saveProfile = (profile) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* noop */
  }
};

export const loadProfile = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
