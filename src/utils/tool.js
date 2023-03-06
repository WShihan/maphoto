import { View } from "ol";
import { fromLonLat } from "ol/proj";
import html2canvas from "html2canvas";
import { Notify } from "./notify";
/**
 * @description 定位到当前位置
 * @export
 */
export function locateHere() {
  navigator.geolocation.getCurrentPosition(
    (post) => {
      const lat = post.coords.latitude;
      const lon = post.coords.longitude;
      window.map.setView(
        new View({
          center: fromLonLat([lon, lat]),
          zoom: 10,
        })
      );
      Notify.success("定位成功！");
    },
    (error) => {
      Notify.warning("定位失败，无法获取地理位置，请授权！");
    }
  );
}

/**
 * @description 将DOM元素转为样式图片
 * @export
 * @param {*} url
 * @return {*}
 */
export function generateStyleImg(
  url = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/maphoto/thumb/3c42f1c8befeeb7b.png"
) {
  return new Promise((resolve, reject) => {
    html2canvas(iconGlow, { useCORS: true }).then((canvas) => {
      var url = canvas.toDataURL("image/jpg");
      var a = document.createElement("a");
      var event = new MouseEvent("click");
      a.download = "地图输出" + ".png"; // 指定下载图片的名称
      a.href = url;
      a.dispatchEvent(event); // 触发超链接的点击事件
      // 新窗口下载
      // var imgURL = canvas
      //   .toDataURL('image/png')
      //   .replace('image/png', 'image/octet-stream')
      // window.open(imgURL)
    });
  });
}
