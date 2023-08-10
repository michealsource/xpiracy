import axios from "axios";
import { APP_CONFIG } from "../config/settings";
import { getData, getToken } from "../redux/storage";

const axiosClient = () => {
  axios.defaults.baseURL = APP_CONFIG.BASE_URL;
  const _token = getData();
  const regToken = getToken();
  const generalToken = _token || regToken;

  // console.log(generalToken, "generall");
  if (generalToken != undefined) {
    axios.defaults.headers.get.Authorization = `Bearer ${generalToken}`;
    axios.defaults.headers.post.Authorization = `Bearer ${generalToken}`;
    axios.defaults.headers.delete.Authorization = `Bearer ${generalToken}`;
    axios.defaults.headers.patch.Authorization = `Bearer ${generalToken}`;
    axios.defaults.headers.put.Authorization = `Bearer ${generalToken}`;
    axios.defaults.headers.common.Authorization = `Bearer ${generalToken}`;
  }
  return axios;
};

export default axiosClient;
