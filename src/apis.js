import axios from "axios";
import nprogress from "nprogress";
import NProgress from "nprogress";

let baseUrl = process.env.VUE_APP_BASE_URL;

export function getMapInitialConfig({ name }) {
  NProgress.start();
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: baseUrl + "/maphoto/view/" + name,
        method: "get",
      })
      .then((response) => {
        nprogress.done();
        resolve(response);
      });
  });
}
