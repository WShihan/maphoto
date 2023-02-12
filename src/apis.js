import axios from "axios";
import nprogress from "nprogress";
import NProgress from "nprogress";

/**
 * @description 获取所有照片点
 * @export
 * @return {Promise}
 */
export function getPhotos() {
  NProgress.start();
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "http://www.xiemolin233.cn:8081/geoserver/wfs",
        method: "get",
        params: {
          service: "wfs",
          srsName: "epsg:3857",
          version: "2.0.0",
          request: "GetFeature",
          typeName: "Yunnan:maphoto",
          outputFormat: "JSON",
          count: 500,
          //   cql_filter: `"中类"='地铁站'`,
        },
      })
      .then((response) => {
        nprogress.done();
        resolve(response.data);
      })
      .catch((error) => {
        reject("获取geoJson失败：" + error);
      });
  });
}

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
