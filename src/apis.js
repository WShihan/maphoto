import axios from "axios";
import nprogress from "nprogress";
import NProgress from "nprogress";

let baseUrl = process.env.VUE_APP_BASE_URL;

/**
 * @description 获取所有照片连接
 * @export
 * @param {*} params
 */
export function getPhotoSrc(params) {
  axios.request({
    url: "",
    method: "get",
    params: params,
  });
}

export function getMapInitialConfig({ name }) {
  NProgress.start();
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: baseUrl + "/maphoto/config/" + name,
        method: "get",
        // params: params,
      })
      .then((response) => {
        nprogress.done();
        resolve(response);
      });
  });
}
