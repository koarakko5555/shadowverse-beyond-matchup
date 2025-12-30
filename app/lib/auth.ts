const LOGIN_ID_REGEX = /^[a-zA-Z0-9_.-]{3,30}$/;

export const isValidLoginId = (loginId: string) =>
  LOGIN_ID_REGEX.test(loginId);
