import axios from "axios";

export function getPhotos() {
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
          typeName: "POI:Hangzhou_poi_transport",
          outputFormat: "JSON",
          count: 500,
          //   cql_filter: `"中类"='地铁站'`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject("获取geoJson失败：" + error);
      });
  });
}

export function getPhotoSrc(params) {
  axios.request({
    url: "",
    method: "get",
    params: params,
  });
}
