const KEY_TOKEN = "APP:USER_MAIN:TOKEN";
const SUCCESS_SIGNUPTOKEN = "APP:USER_MAIN:DATA";
const PAY_IT_FORWARD_LAST_CONTENT_ID = "APP:USER_MAIN:PAY_IT_FORWARD_LAST_CONTENT_ID";
const PAY_IT_FORWARD_LAST_COLLECTION_ID = "APP:USER_MAIN:PAY_IT_FORWARD_LAST_COLLECTION_ID";

export const setToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token);
};

export const getToken = () => {
  let token = localStorage.getItem(KEY_TOKEN);
  return token;
};
export const clearToken = () => {
  let token = localStorage.removeItem(KEY_TOKEN);
  return token;
};

export const setData = (data) => {
  localStorage.setItem(SUCCESS_SIGNUPTOKEN, data);
};

export const getData = () => {
  let loginToken = localStorage.getItem(SUCCESS_SIGNUPTOKEN);
  return loginToken;
};

export const setIdForPTF = (id) => {
  localStorage.setItem(PAY_IT_FORWARD_LAST_CONTENT_ID, id);
};

export const getIdPTF = () => {
  let token = localStorage.getItem(PAY_IT_FORWARD_LAST_CONTENT_ID);
  return token;
};

export const setIdForCollection = (id) => {
  localStorage.setItem(PAY_IT_FORWARD_LAST_COLLECTION_ID, id);
};

export const getIdCollection = () => {
  let token = localStorage.getItem(PAY_IT_FORWARD_LAST_COLLECTION_ID);
  return token;
};
